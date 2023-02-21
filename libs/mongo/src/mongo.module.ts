import { Global, Inject, Module, OnApplicationBootstrap } from '@nestjs/common';
import { ConfigService, ConfigType } from '@nestjs/config';
import { InjectModel, MongooseModule } from '@nestjs/mongoose';
import { adminConfig, ConfigModule } from '@leaf/config';
import { AuthProvider, UserRole } from '@leaf/types';
import { ObjectId } from 'mongodb';
import { ModelName } from './constants';
import { models } from './models';
import { AuthModel, UserModel } from './schemas';

@Global()
@Module({
  imports: [
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (service: ConfigService) => {
        const uri = service.get('MONGO_URI');
        return { uri };
      },
      inject: [ConfigService],
    }),
    MongooseModule.forFeature(models),
  ],
  exports: [MongooseModule],
})
export class MongoModule implements OnApplicationBootstrap {
  constructor(
    @Inject(adminConfig.KEY)
    private readonly _adminConfig: ConfigType<typeof adminConfig>,
    @InjectModel(ModelName.AUTH) private readonly _authModel: AuthModel,
    @InjectModel(ModelName.USER) private readonly _userModel: UserModel,
  ) {}

  async onApplicationBootstrap() {
    await this._createAdmin();
  }

  private async _createAdmin() {
    const { email, password, nickname } = this._adminConfig;
    const existed = !!(await this._userModel.findOne({ email }).lean());
    if (!existed) {
      const [authId, userId] = [new ObjectId(), new ObjectId()];
      await Promise.all([
        this._authModel.create({
          _id: authId,
          provider: AuthProvider.LOCAL,
          providerId: userId.toString(),
          password,
          user: userId,
        }),
        this._userModel.create({
          _id: userId,
          email,
          role: UserRole.ADMIN,
          nickname,
          auth: authId,
        }),
      ]);
    }
  }
}

import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { AuthModel, ModelName, TokenModel, UserModel } from '@leaf/mongo';
import { WithdrawUserCommand } from '../impl';

@CommandHandler(WithdrawUserCommand)
export class WithdrawUserHandler
  implements ICommandHandler<WithdrawUserCommand>
{
  constructor(
    @InjectModel(ModelName.AUTH) private readonly _authModel: AuthModel,
    @InjectModel(ModelName.TOKEN) private readonly _tokenModel: TokenModel,
    @InjectModel(ModelName.USER) private readonly _userModel: UserModel,
  ) {}

  async execute(command: WithdrawUserCommand): Promise<any> {
    const { userId } = command;
    const userDocument = await this._userModel.findById(userId);
    const authDocument = await this._authModel.findOne({ user: userId });
    userDocument.auth = null;
    await Promise.all([
      userDocument.save(),
      authDocument.deleteOne(),
      this._tokenModel.deleteMany({ user: userId }),
    ]);
  }
}

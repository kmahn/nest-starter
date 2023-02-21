import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { InvalidPasswordException } from '@leaf/errors';
import { AuthModel, ModelName, UserModel } from '@leaf/mongo';
import { ChangeMyPasswordCommand } from '../impl';

@CommandHandler(ChangeMyPasswordCommand)
export class ChangeMyPasswordHandler
  implements ICommandHandler<ChangeMyPasswordCommand>
{
  constructor(
    @InjectModel(ModelName.AUTH) private readonly _authModel: AuthModel,
    @InjectModel(ModelName.USER) private readonly _userModel: UserModel,
  ) {}

  async execute(command: ChangeMyPasswordCommand): Promise<any> {
    const { oldPassword, newPassword, userId } = command;
    const userDocument = await this._userModel.findById(userId).lean();
    const authDocument = await this._authModel.findById(userDocument.auth);
    if (!authDocument.authenticate(oldPassword))
      throw new InvalidPasswordException();
    authDocument.password = newPassword;
    await authDocument.save();
  }
}

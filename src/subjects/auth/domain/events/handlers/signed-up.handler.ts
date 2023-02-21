import { Logger } from '@nestjs/common';
import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { ModelName, UserModel } from '@leaf/mongo';
import { SignedUpEvent } from '../impl';

@EventsHandler(SignedUpEvent)
export class SignedUpHandler implements IEventHandler<SignedUpEvent> {
  constructor(
    @InjectModel(ModelName.USER)
    private readonly _userModel: UserModel, // private readonly _emailService: EmailService,
  ) {}

  async handle(event: SignedUpEvent) {
    const { userId } = event;
    const userDocument = await this._userModel.findById(userId).lean();
    if (userDocument) {
      Logger.debug(`SignUp ${JSON.stringify(userDocument)}`);
    }
  }
}

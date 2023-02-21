import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  InvalidPasswordException,
  UserNotFoundException,
  WithdrawnUserException,
} from '@leaf/errors';
import { AuthModel, ModelName, UserModel } from '@leaf/mongo';
import { UserProfile } from '@leaf/types';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(ModelName.AUTH) private _authModel: AuthModel,
    @InjectModel(ModelName.USER) private _userModel: UserModel,
  ) {}

  async validateLocalAuth(
    email: string,
    password: string,
  ): Promise<UserProfile> {
    const userDocument = await this._userModel.findOne({ email });
    if (!userDocument) throw new UserNotFoundException();

    const { auth } = userDocument;
    if (!auth) throw new WithdrawnUserException();

    const authDocument = await this._authModel.findById(auth);
    if (!authDocument?.authenticate(password))
      throw new InvalidPasswordException();

    return userDocument.profile;
  }

  // async validateOAuth(data: OAuthData): Promise<UserProfile> {
  //   const { provider, providerId, nickname, email } = data;
  //   const exAuthDocument = await this._authModel.findOne({
  //     provider,
  //     providerId,
  //   });
  //   let userDocument: UserDocument;
  //
  //   if (email) {
  //     userDocument = await this._userModel.findOne({ email });
  //     if (userDocument && !userDocument.auth) {
  //       await exAuthDocument?.deleteOne();
  //       throw new WithdrawnUserException();
  //     }
  //   }
  //
  //   if (exAuthDocument) {
  //     userDocument = await this._userModel.findById(exAuthDocument.user);
  //     if (!userDocument) {
  //       await exAuthDocument.deleteOne();
  //       throw new UserNotFoundException();
  //     }
  //     if (!userDocument.auth) {
  //       await exAuthDocument.deleteOne();
  //       throw new WithdrawnUserException();
  //     }
  //   } else if (userDocument) {
  //     const $set = { provider, providerId };
  //     await this._authModel.updateOne({ _id: userDocument.auth }, { $set });
  //   } else {
  //     const [authId, userId] = [new ObjectId(), new ObjectId()];
  //     const auth = { _id: authId, provider, providerId, user: userId };
  //     const user = { _id: userId, auth: authId, email, nickname };
  //     [userDocument] = await Promise.all([
  //       this._userModel.create(user),
  //       this._authModel.create(auth),
  //     ]);
  //   }
  //
  //   const { _id, role } = userDocument;
  //   return { _id, role };
  // }
}

import { Injectable } from '@nestjs/common';
import { EventBus } from '@nestjs/cqrs';
import { InjectModel } from '@nestjs/mongoose';
import { BearerTokenService } from '@leaf/auth';
import {
  EmailAddressUsedException,
  ForbiddenException,
  InvalidAuthCodeException,
  PhoneNumberUsedException,
  UserNotFoundException,
  WithdrawnUserException,
} from '@leaf/errors';
import {
  AuthCodeModel,
  AuthModel,
  ModelName,
  TokenModel,
  UserModel,
} from '@leaf/mongo';
import {
  AuthCodeRequestDto,
  AuthCodeRequestType,
  AuthProvider,
  CheckEmailAddressRequestDto,
  CheckPhoneNumberRequestDto,
  ExistsResponseDto,
  IdType,
  InitPasswordRequestDto,
  LoginResponseDto,
  RefreshTokenRequestDto,
  RefreshTokenResponseDto,
  SignupRequestDto,
  UserEntity,
  UserProfile,
  UserRole,
  ValidateAuthCodeRequestDto,
} from '@leaf/types';
import { ObjectId } from 'mongodb';
import { v4 } from 'uuid';
import { AuthCodeCreatedEvent, SignedUpEvent } from '../domain';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(ModelName.AUTH) private readonly _authModel: AuthModel,
    @InjectModel(ModelName.USER) private readonly _userModel: UserModel,
    @InjectModel(ModelName.AUTH_CODE) private readonly _otpModel: AuthCodeModel,
    @InjectModel(ModelName.TOKEN) private readonly _tokenModel: TokenModel,
    private readonly _bearerTokenService: BearerTokenService,
    private readonly _eventBus: EventBus,
  ) {}

  async createAuthTokens(user: UserProfile): Promise<LoginResponseDto> {
    const _id = new ObjectId();
    const accessToken = this._bearerTokenService.sign(user);
    const refreshToken = v4();
    await this._tokenModel.create({ _id, refreshToken, user: user._id });
    return { accessToken, refreshToken };
  }

  async logout(refreshToken: string, userId: IdType) {
    const tokenDocument = await this._tokenModel.findOne({ refreshToken });
    if (tokenDocument) {
      if (String(tokenDocument.user) !== String(userId))
        throw new ForbiddenException();
      await tokenDocument.deleteOne();
    }
  }

  async signUp(dto: SignupRequestDto) {
    const { password, ...user } = dto;

    await this._validateSignup(user);
    await this._createUserAndAuth(user, password);
  }

  async refreshToken(
    dto: RefreshTokenRequestDto,
  ): Promise<RefreshTokenResponseDto> {
    const { refreshToken } = dto;
    const tokenDocument = await this._tokenModel.findOne({ refreshToken });
    const { user } = tokenDocument;
    const userDocument = await this._userModel.findById(user);
    const [tokens] = await Promise.all([
      this.createAuthTokens(userDocument.profile),
      tokenDocument.deleteOne(),
    ]);
    return tokens;
  }

  async isExistsEmailAddress(
    dto: CheckEmailAddressRequestDto,
  ): Promise<ExistsResponseDto> {
    const { email } = dto;
    const exists = !!(await this._userModel.findOne({ email }).lean());
    return { exists };
  }

  async isExistsPhoneNumber(
    dto: CheckPhoneNumberRequestDto,
  ): Promise<ExistsResponseDto> {
    const { phone } = dto;
    const exists = !!(await this._userModel.findOne({ phone }).lean());
    return { exists };
  }

  async createAuthCode(dto: AuthCodeRequestDto) {
    const { key, type } = dto;
    const value = await this._otpModel.createAuthCode(key);
    this._eventBus.publish(new AuthCodeCreatedEvent(key, type, value));
  }

  async validateAuthCode(dto: ValidateAuthCodeRequestDto) {
    const { key, code } = dto;
    const exAuthCodeDocument = await this._otpModel.findOne({ key }).lean();
    if (!exAuthCodeDocument) throw new InvalidAuthCodeException();
    if (exAuthCodeDocument.value !== code) throw new InvalidAuthCodeException();
  }

  async initPassword(dto: InitPasswordRequestDto) {
    const { key, type, password, code } = dto;
    await this.validateAuthCode({ key, code });

    const userDocument = await (type === AuthCodeRequestType.EMAIL
      ? this._userModel.findOne({ email: key }).lean()
      : this._userModel.findOne({ phone: key }).lean());
    if (!userDocument) throw new UserNotFoundException();
    if (!userDocument.auth) throw new WithdrawnUserException();

    const authDocument = await this._authModel.findById(userDocument.auth);
    authDocument.password = password;
    await authDocument.save();
  }

  private async _validateSignup(user: Partial<UserEntity>) {
    const { email, phone } = user;
    const [exEmail, exPhone] = await Promise.all([
      email
        ? this._userModel
            .findOne({ email })
            .lean()
            .then((existed) => !!existed)
        : Promise.resolve(false),
      phone
        ? this._userModel
            .findOne({ phone })
            .lean()
            .then((existed) => !!existed)
        : Promise.resolve(false),
    ]);
    if (exEmail) throw new EmailAddressUsedException();
    if (exPhone) throw new PhoneNumberUsedException();
  }

  private async _createUserAndAuth(
    user: Partial<UserEntity>,
    password: string,
  ) {
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
        ...user,
        _id: userId,
        role: UserRole.MEMBER,
        auth: authId,
      }),
    ]);

    this._eventBus.publish(new SignedUpEvent(userId));
  }
}

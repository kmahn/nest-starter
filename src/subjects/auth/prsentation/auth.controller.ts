import {
  Body,
  Controller,
  Get,
  Headers,
  HttpCode,
  Patch,
  Post,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiHeader,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Auth, LoginRequired, User } from '@leaf/auth';
import {
  BadRequestDtoException,
  InvalidAuthCodeException,
  UserNotFoundException,
  WithdrawnUserException,
} from '@leaf/errors';
import { ApiExceptions } from '@leaf/swagger';
import { AuthProvider, LoginResponseDto, UserProfile } from '@leaf/types';
import { AuthService } from '../application';
import {
  AuthCodeRequestDtoImpl,
  CheckEmailAddressRequestDtoImpl,
  CheckPhoneNumberRequestDtoImpl,
  ExistsResponseDtoImpl,
  InitPasswordRequestDtoImpl,
  RefreshTokenRequestDtoImpl,
  RefreshTokenResponseDtoImpl,
  SignupRequestDtoImpl,
  ValidateAuthCodeRequestDtoImpl,
} from './dto';

@ApiTags('인증 APIs')
@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @ApiOperation({
    summary: '로컬 로그인 API',
    description: '이메일과 비밀번호를 이용하여 로그인을 한다.',
  })
  @Auth(AuthProvider.LOCAL)
  @Post('login')
  logIn(@User() user: UserProfile): Promise<LoginResponseDto> {
    return this._authService.createAuthTokens(user);
  }

  @ApiOperation({
    summary: '로그아웃 API',
    description: '로그아웃을 수행한다.',
  })
  @ApiHeader({ name: 'x-refresh-token', description: '리프레시 토큰' })
  @LoginRequired
  @Get('logout')
  async logout(
    @Headers('x-refresh-token') token: string,
    @User() user: UserProfile,
  ): Promise<void> {
    await this._authService.logout(token, user._id);
  }

  @ApiOperation({
    summary: '로컬 회원 가입 API',
    description: '회원 가입을 한다.',
  })
  @ApiCreatedResponse()
  @ApiExceptions(BadRequestDtoException)
  @Post('signup')
  async signUp(@Body() dto: SignupRequestDtoImpl) {
    await this._authService.signUp(dto);
  }

  @ApiOperation({
    summary: '액세스 토큰 갱신 API',
    description: '액세스 토큰을 갱신한다.',
  })
  @ApiResponse({ type: RefreshTokenResponseDtoImpl })
  @ApiExceptions(BadRequestDtoException)
  @HttpCode(200)
  @Post('token/refresh')
  async refeshToken(@Body() dto: RefreshTokenRequestDtoImpl) {
    return this._authService.refreshToken(dto);
  }

  @ApiOperation({
    summary: '이메일 존재 여부 체크 API',
    description: '가입된 이메일이 존재하는지 여부를 체크한다.',
  })
  @ApiResponse({ type: ExistsResponseDtoImpl })
  @ApiExceptions(BadRequestDtoException)
  @Post('email/exists')
  async isExistsEmailAddress(@Body() dto: CheckEmailAddressRequestDtoImpl) {
    return await this._authService.isExistsEmailAddress(dto);
  }

  @ApiOperation({
    summary: '전화번호 존재 여부 체크 API',
    description: '가입된 전화번호가 존재하는지 여부를 체크한다.',
  })
  @ApiResponse({ type: ExistsResponseDtoImpl })
  @ApiExceptions(BadRequestDtoException)
  @Post('phone/exists')
  async isExistsPhoneNumber(@Body() dto: CheckPhoneNumberRequestDtoImpl) {
    return await this._authService.isExistsPhoneNumber(dto);
  }

  @ApiOperation({
    summary: '인증번호 발송 API',
    description: '인증번호를 Email 또는 SMS로 전송한다.',
  })
  @ApiCreatedResponse()
  @ApiExceptions(BadRequestDtoException)
  @Post('code')
  async createAuthCode(@Body() dto: AuthCodeRequestDtoImpl) {
    await this._authService.createAuthCode(dto);
  }

  @ApiOperation({
    summary: '인증번호 검증 API',
    description: '인증번호를 검증한다.',
  })
  @ApiOkResponse()
  @ApiExceptions(BadRequestDtoException, InvalidAuthCodeException)
  @HttpCode(200)
  @Post('code/validate')
  async validateAuthCode(@Body() dto: ValidateAuthCodeRequestDtoImpl) {
    await this._authService.validateAuthCode(dto);
  }

  @ApiOperation({
    summary: '비밀번호 초기화 API',
    description: '새로이 설정한 비밀번호로 비밀번호를 초기화한다.',
  })
  @ApiOkResponse()
  @ApiExceptions(
    BadRequestDtoException,
    InvalidAuthCodeException,
    UserNotFoundException,
    WithdrawnUserException,
  )
  @Patch('password/init')
  async initPassword(@Body() dto: InitPasswordRequestDtoImpl) {
    await this._authService.initPassword(dto);
  }
}

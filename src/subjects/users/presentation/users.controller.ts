import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Query,
} from '@nestjs/common';
import {
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { LoginRequired, OperatorRolesRequired, User } from '@leaf/auth';
import { BadRequestDtoException } from '@leaf/errors';
import { ApiExceptions } from '@leaf/swagger';
import { UserProfile, UserRole } from '@leaf/types';
import { UsersService } from '../application/users.service';
import {
  ChangePasswordRequestDtoImpl,
  ChangeRoleRequestDtoImpl,
  SearchUserRequestDtoImpl,
} from './dto';
import { FindUserResponseDtoImpl } from './dto/find-user-response.dto-impl';
import { SearchUserResponseDtoImpl } from './dto/search-user-response.dto-impl';

@ApiTags('사용자 APIs')
@Controller('users')
export class UsersController {
  constructor(private readonly _usersService: UsersService) {}

  @ApiOperation({
    summary: '회원 목록 API',
    description: '회원 목록을 가져온다.',
  })
  @ApiResponse({ type: SearchUserResponseDtoImpl })
  @ApiExceptions(BadRequestDtoException)
  @OperatorRolesRequired
  @Get('members')
  getMembers(@Query() dto: SearchUserRequestDtoImpl) {
    dto.role = UserRole.MEMBER;
    return this._usersService.getUsers(dto);
  }

  @ApiOperation({
    summary: '운영자 목록 API',
    description: '운영자 목록을 가져온다.',
  })
  @ApiResponse({ type: SearchUserResponseDtoImpl })
  @ApiExceptions(BadRequestDtoException)
  @OperatorRolesRequired
  @Get('operators')
  getOperators(@Query() dto: SearchUserRequestDtoImpl) {
    dto.role = UserRole.OPERATOR;
    return this._usersService.getUsers(dto);
  }

  @ApiOperation({
    summary: '내 정보 API',
    description: '로그인한 사용자 본인의 정보를 가져온다.',
  })
  @ApiResponse({ type: FindUserResponseDtoImpl })
  @LoginRequired
  @Get('me')
  getMe(@User() user: UserProfile) {
    return this._usersService.getUser(user._id);
  }

  @ApiOkResponse()
  @LoginRequired
  @Patch('me/password')
  async changeMyPassword(
    @User() user: UserProfile,
    @Body() dto: ChangePasswordRequestDtoImpl,
  ) {
    await this._usersService.changeMyPassword(dto, user._id);
  }

  @ApiOperation({
    summary: '탈퇴 API',
    description: '로그인한 계정의 사용자를 탈퇴처리한다.',
  })
  @ApiOkResponse()
  @LoginRequired
  @Delete('me/withdraw')
  async withdraw(@User() user: UserProfile) {
    await this._usersService.withdraw(user._id);
  }

  @ApiOperation({
    summary: '사용자 정보 API',
    description: '사용자의 정보를 가져온다.',
  })
  @ApiResponse({ type: FindUserResponseDtoImpl })
  @ApiParam({ name: 'id', description: '사용자의 아이디' })
  @OperatorRolesRequired
  @Get(':id')
  getUser(@Param('id') id: string) {
    return this._usersService.getUser(id);
  }

  @ApiOperation({
    summary: '탈퇴 API',
    description: '로그인한 계정의 사용자를 탈퇴처리한다.',
  })
  @ApiOkResponse()
  @ApiParam({ name: 'id', description: '탈퇴시킬 회원의 아이디' })
  @OperatorRolesRequired
  @Delete(':id/withdraw')
  async withdrawUser(@Param('id') id: string) {
    await this._usersService.withdraw(id);
  }

  @ApiOperation({
    summary: '사용자 역할 변경 API',
    description: '사용자의 역할(role)을 변경한다.',
  })
  @ApiOkResponse()
  @ApiExceptions(BadRequestDtoException)
  @ApiParam({ name: 'id', description: '사용자의 아이디' })
  @OperatorRolesRequired
  @Patch(':id/role')
  async changeRole(
    @Param('id') id: string,
    @Body() dto: ChangeRoleRequestDtoImpl,
  ) {
    await this._usersService.changeRole(dto, id);
  }
}

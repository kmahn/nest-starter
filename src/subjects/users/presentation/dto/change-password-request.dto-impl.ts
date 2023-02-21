import { ApiProperty } from '@nestjs/swagger';
import { ChangePasswordRequestDto } from '@leaf/types';
import { IsNotEmpty, IsString } from 'class-validator';

export class ChangePasswordRequestDtoImpl implements ChangePasswordRequestDto {
  @ApiProperty({ description: '이전 비밀번호' })
  @IsString()
  @IsNotEmpty()
  oldPassword: string;

  @ApiProperty({ description: '새로운 비밀번호' })
  @IsString()
  @IsNotEmpty()
  newPassword: string;
}

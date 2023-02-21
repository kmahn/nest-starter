import { ApiProperty } from '@nestjs/swagger';
import { SignupRequestDto } from '@leaf/types';
import { IsEmail, IsOptional, IsString, MinLength } from 'class-validator';

export class SignupRequestDtoImpl implements SignupRequestDto {
  @ApiProperty()
  @IsEmail()
  email: string;

  @ApiProperty()
  @IsString()
  @MinLength(3)
  nickname: string;

  @ApiProperty()
  @IsOptional()
  phone?: string;

  @ApiProperty()
  @IsString()
  password: string;
}

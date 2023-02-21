import { ApiProperty } from '@nestjs/swagger';
import { AuthCodeRequestType, InitPasswordRequestDto } from '@leaf/types';
import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export class InitPasswordRequestDtoImpl implements InitPasswordRequestDto {
  @ApiProperty({ description: '인증번호가 전송된 이메일 또는 전화번호' })
  @IsString()
  @IsNotEmpty()
  key: string;

  @ApiProperty({
    enum: Object.values(AuthCodeRequestType),
    description: '인증번호가 전송된 방법(email or phone)',
  })
  @IsEnum(AuthCodeRequestType)
  type: AuthCodeRequestType;

  @ApiProperty({ description: '전송된 인증번호' })
  @IsString()
  @IsNotEmpty()
  code: string;

  @ApiProperty({ description: '초기화할 비밀번호' })
  @IsString()
  @IsNotEmpty()
  password: string;
}

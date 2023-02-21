import { ApiProperty } from '@nestjs/swagger';
import { ValidateAuthCodeRequestDto } from '@leaf/types';
import { IsString } from 'class-validator';

export class ValidateAuthCodeRequestDtoImpl
  implements ValidateAuthCodeRequestDto
{
  @ApiProperty({ description: '인증 번호가 전송된 이메일 주소 또는 전화번호' })
  @IsString()
  key: string;

  @ApiProperty({ description: '전송된 인증번호' })
  @IsString()
  code: string;
}

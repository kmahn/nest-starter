import { ApiProperty } from '@nestjs/swagger';
import { AuthCodeRequestDto, AuthCodeRequestType } from '@leaf/types';
import { IsEnum, IsString } from 'class-validator';

export class AuthCodeRequestDtoImpl implements AuthCodeRequestDto {
  @ApiProperty({ description: '이메일 주소 또는 전화번호' })
  @IsString()
  key: string;

  @ApiProperty({
    enum: Object.values(AuthCodeRequestType),
    description: `'Email 전송일 경우 "${AuthCodeRequestType.EMAIL}, SMS 전송일 경우 "${AuthCodeRequestType.PHONE}"`,
  })
  @IsEnum(AuthCodeRequestType)
  type: AuthCodeRequestType;
}

import { ApiProperty } from '@nestjs/swagger';
import { CheckPhoneNumberRequestDto } from '@leaf/types';
import { IsString } from 'class-validator';

export class CheckPhoneNumberRequestDtoImpl
  implements CheckPhoneNumberRequestDto
{
  @ApiProperty()
  @IsString()
  phone: string;
}

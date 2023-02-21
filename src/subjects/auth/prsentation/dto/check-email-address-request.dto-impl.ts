import { ApiProperty } from '@nestjs/swagger';
import { CheckEmailAddressRequestDto } from '@leaf/types';
import { IsEmail } from 'class-validator';

export class CheckEmailAddressRequestDtoImpl
  implements CheckEmailAddressRequestDto
{
  @ApiProperty()
  @IsEmail()
  email: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { LoginRequestDto } from '@leaf/types';

export class LoginRequestDtoImpl implements LoginRequestDto {
  @ApiProperty()
  email: string;

  @ApiProperty()
  password: string;
}

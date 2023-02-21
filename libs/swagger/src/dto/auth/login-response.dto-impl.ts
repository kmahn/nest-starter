import { ApiProperty } from '@nestjs/swagger';
import { LoginResponseDto } from '@leaf/types';

export class LoginResponseDtoImpl implements LoginResponseDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}

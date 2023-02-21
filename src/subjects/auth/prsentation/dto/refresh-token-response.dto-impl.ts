import { ApiProperty } from '@nestjs/swagger';
import { RefreshTokenResponseDto } from '@leaf/types';

export class RefreshTokenResponseDtoImpl implements RefreshTokenResponseDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  refreshToken: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { RefreshTokenRequestDto } from '@leaf/types';

export class RefreshTokenRequestDtoImpl implements RefreshTokenRequestDto {
  @ApiProperty({ description: '로그인시 발급 받은 리프레시 토큰' })
  refreshToken: string;
}

import { ApiProperty } from '@nestjs/swagger';
import { ExistsResponseDto } from '@leaf/types';
import { IsBoolean } from 'class-validator';

export class ExistsResponseDtoImpl implements ExistsResponseDto {
  @ApiProperty()
  @IsBoolean()
  exists: boolean;
}

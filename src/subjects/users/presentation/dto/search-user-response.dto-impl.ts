import { ApiProperty } from '@nestjs/swagger';
import { FindUserResponseDto, SearchUserResponseDto } from '@leaf/types';
import { FindUserResponseDtoImpl } from './find-user-response.dto-impl';

export class SearchUserResponseDtoImpl implements SearchUserResponseDto {
  @ApiProperty({ type: Number })
  total: number;

  @ApiProperty({ type: [FindUserResponseDtoImpl] })
  documents: FindUserResponseDto[];
}

import { ApiProperty } from '@nestjs/swagger';
import {
  FindUserResponseDto,
  IdType,
  UserRole,
  USER_ROLES,
} from '@leaf/types';

export class FindUserResponseDtoImpl implements FindUserResponseDto {
  @ApiProperty()
  _id: string;

  @ApiProperty({ type: String, enum: USER_ROLES })
  role: UserRole;

  @ApiProperty({ required: false })
  email?: string;

  @ApiProperty({ nullable: true })
  nickname: string | null;

  @ApiProperty({ required: false })
  phone?: string;

  @ApiProperty()
  auth: IdType;

  @ApiProperty({ type: Date, nullable: true })
  accessDate: Date | null;

  @ApiProperty({ type: Date })
  createdAt: Date;

  @ApiProperty({ type: Date })
  updatedAt: Date;
}

import { ApiProperty } from '@nestjs/swagger';
import {
  SearchUserRequestDto,
  SortValue,
  UserRole,
  UserSort,
} from '@leaf/types';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class SearchUserRequestDtoImpl implements SearchUserRequestDto {
  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  _q?: string;

  @ApiProperty({ type: Number, required: false })
  @IsInt()
  @IsOptional()
  _limit?: number;

  @ApiProperty({ type: Number, required: false })
  _skip?: number;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  _sort?: SortValue<UserSort>;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  _id?: string;

  // @ApiProperty({ required: false })
  // @IsString()
  // @IsEnum(UserRole)
  // @IsOptional()
  role?: UserRole;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  email?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  nickname?: string;

  @ApiProperty({ required: false })
  @IsString()
  @IsOptional()
  phone?: string;
}

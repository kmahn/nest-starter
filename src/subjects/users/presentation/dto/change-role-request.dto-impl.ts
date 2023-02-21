import { ApiProperty } from '@nestjs/swagger';
import { ChangeRoleRequestDto, UserRole } from '@leaf/types';
import { IsEnum, IsString } from 'class-validator';

export class ChangeRoleRequestDtoImpl implements ChangeRoleRequestDto {
  @ApiProperty({ enum: Object.values(UserRole) })
  @IsString()
  @IsEnum(UserRole)
  role: UserRole;
}

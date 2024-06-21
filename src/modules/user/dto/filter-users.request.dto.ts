import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

import { ESort } from 'src/common/enums/sort.enum';
import { EUserRole } from 'src/common/enums/user-role.enum';

export class UsersFilterDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  search: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  role: EUserRole;

  @ApiProperty()
  @IsOptional()
  @IsString()
  order: ESort;

  @ApiProperty()
  @IsOptional()
  @IsPositive()
  @IsNumber()
  page: number = 1;

  @ApiProperty()
  @IsOptional()
  @IsPositive()
  @IsNumber()
  limit: number;
}

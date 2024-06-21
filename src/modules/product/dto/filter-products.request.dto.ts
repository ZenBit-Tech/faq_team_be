import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

import { ESort } from 'src/common/enums/sort.enum';

export class ProductsFilterDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  search: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  size: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  style: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  color: string;

  @IsOptional()
  @IsNumber()
  min: number;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  max: number;

  @ApiProperty()
  @IsOptional()
  @IsString()
  order: ESort;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  page: number = 1;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  limit: number;
}

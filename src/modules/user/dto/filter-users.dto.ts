import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';
import { ESort } from 'src/common/enums/sort.enum';

export class UsersFilterDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  search: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  order?: ESort.DESC | ESort.ASC;

  @ApiProperty()
  @IsOptional()
  @IsPositive()
  @IsNumber()
  page: number;

  @ApiProperty()
  @IsOptional()
  @IsPositive()
  @IsNumber()
  limit: number;
}

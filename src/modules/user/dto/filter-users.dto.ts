import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsPositive, IsString } from 'class-validator';

export class UsersFilterDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  search: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  order?: 'DESC' | 'ASC';

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

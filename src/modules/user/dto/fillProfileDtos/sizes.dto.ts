import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SizesDto {
  @IsString()
  @ApiProperty()
  id: string;

  @ApiProperty()
  @IsString()
  clothSize: string;

  @ApiProperty()
  @IsString()
  shoesSize: number;

  @ApiProperty()
  @IsString()
  jeansSize: string;
}

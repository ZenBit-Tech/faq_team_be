import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsString } from 'class-validator';

export class RateRequestDto {
  @ApiProperty()
  @IsString()
  id: string;

  @ApiProperty()
  @Transform(({ value }) => parseInt(value))
  @IsNumber()
  rate: number;
}
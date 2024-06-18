import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class GeneralInfoDto {
  @IsNumber()
  @ApiProperty()
  step: number;

  @IsString()
  @ApiProperty()
  image: Express.Multer.File;

  @IsString()
  @ApiProperty()
  phone: string;
}

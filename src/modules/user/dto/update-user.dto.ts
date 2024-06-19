import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
  Matches,
  MinLength,
} from 'class-validator';

import { EUserRole } from 'src/common/enums/user-role.enum';
import { EUserStatus } from 'src/common/enums/user-status.enum';

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  @IsString()
  full_name: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  @Matches(
    /^(([^<>()[\]\\.,;:\s@\\"]+(\.[^<>()[\]\\.,;:\s@\\"]+)*)|(\\".+\\"))@(([^<>()[\]\\.,;:\s@\\"]+\.)+[^<>()[\]\\.,;:\s@\\"]{2,})$/i,
  )
  email: string;

  @ApiProperty()
  @IsOptional()
  @Matches(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
  @MinLength(8)
  password: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  user_status: EUserStatus;

  @ApiProperty()
  @IsOptional()
  @IsString()
  role: EUserRole;

  @ApiProperty()
  @IsOptional()
  @IsString()
  avatar: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  phone: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  address: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  address_2: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  country: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  state: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  city: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  cloth_size: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  jeans_size: string;

  @ApiProperty()
  @IsOptional()
  @Transform(({ value }) => parseFloat(value))
  @IsNumber()
  shoes_size: number;
}

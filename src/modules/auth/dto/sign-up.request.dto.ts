import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsString, Length, Matches } from 'class-validator';

export class SignUpRequestDto {
  @ApiProperty({ example: 'UserName' })
  @IsString()
  @Length(3, 20)
  @Type(() => String)
  full_name: string;

  @ApiProperty({ example: 'test@gmail.com' })
  @IsString()
  @Length(1, 50)
  @Matches(/^[^\s@]+@([^\s@.,]+\.)+[^\s@.,]{2,}$/)
  email: string;

  @ApiProperty({ example: '123qwe!@#QWE' })
  @IsString()
  @Length(0, 20)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%_*#?&])[A-Za-z\d@$_!%*#?&]{8,}$/)
  password: string;
}

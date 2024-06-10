import { ApiProperty } from '@nestjs/swagger';
import { IsString, Matches } from 'class-validator';

export class SendOtpRequestDto {
  @ApiProperty()
  @IsString()
  @Matches('/^[^\\s@]+@([^\\s@.,]+\\.)+[^\\s@.,]{2,}$/')
  email: string;
}

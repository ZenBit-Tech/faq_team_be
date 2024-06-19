import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

import { SendOtpRequestDto } from 'src/modules/auth/dto/send-otp.request.dto';
import { otpGeneratorParams } from 'src/utils/generalConstants';

export class VerifyOtpRequestDto extends SendOtpRequestDto {
  @ApiProperty()
  @IsString()
  @Length(otpGeneratorParams.length, otpGeneratorParams.length)
  otp_code: string;
}

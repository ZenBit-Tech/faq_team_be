import { ApiProperty } from '@nestjs/swagger';
import { IsString, Length } from 'class-validator';

import { otpGeneratorParams } from '../../../utils/generalConstants';
import { SendOtpRequestDto } from './send-otp.request.dto';

export class VerifyOtpRequestDto extends SendOtpRequestDto {
  @ApiProperty()
  @IsString()
  @Length(otpGeneratorParams.length, otpGeneratorParams.length)
  otp_code: string;
}

import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ERouteName } from 'src/common/enums/route-name.enum';
import {
  AccesResponseDto,
  AuthReqDto,
} from 'src/modules/auth/dto/sign-in.response.dto';
import { SignUpRequestDto } from 'src/modules/auth/dto/sign-up.request.dto';
import { AuthService } from 'src/modules/auth/services/auth.service';

import { UserEntity } from '../../entities/user.entity';
import { SendOtpRequestDto } from './dto/send-otp.request.dto';
import { VerifyOtpRequestDto } from './dto/verify-otp.request.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { OtpService } from './services/otp.service';

@ApiTags('Authorization')
@Controller(ERouteName.AUTH_ROUTE)
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly otpService: OtpService,
  ) {}
  @ApiOperation({ summary: 'Register new user' })
  @ApiResponse({
    status: 201,
    description: 'The user has been successfully registered',
  })
  @Post(ERouteName.SIGNUP_ROUTE)
  public async signUp(@Body() dto: SignUpRequestDto): Promise<void> {
    return await this.authService.signUp(dto);
  }

  @UseGuards(LocalAuthGuard)
  @Post(ERouteName.SIGNIN_ROUTE)
  @ApiOperation({ summary: 'Sign in a user' })
  @ApiOkResponse({
    description: 'User signed in successfully',
    status: 200,
    type: SignUpRequestDto,
  })
  @ApiInternalServerErrorResponse({
    description: 'Internal server error',
  })
  async login(@Req() { user }: AuthReqDto): Promise<AccesResponseDto> {
    return this.authService.login(user);
  }

  @Post('/send-otp')
  @ApiOperation({ summary: 'Send otp code to provided email' })
  async restorePassword(@Body() dto: SendOtpRequestDto): Promise<void> {
    return await this.otpService.sendOtp(dto.email);
  }

  @Post('/verify-otp')
  @ApiOperation({ summary: 'Verify provided otp code' })
  async verifyOtp(@Body() dto: VerifyOtpRequestDto): Promise<UserEntity> {
    return await this.otpService.verifyOtp(dto.email, dto.otp_code);
  }
}

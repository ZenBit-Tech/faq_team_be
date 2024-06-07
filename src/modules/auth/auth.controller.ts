import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { ERouteName } from 'src/common/enums/route-name.enum';
import { SignUpRequestDto } from 'src/modules/auth/dto/request/sign-up.request.dto';
import {
  AccesResponseDto,
  AuthReqDto,
} from 'src/modules/auth/dto/response/sign-in.response.dto';
import { LocalAuthGuard } from 'src/modules/auth/local-auth.guard';
import { AuthService } from 'src/modules/auth/services/auth.service';

@ApiTags('Authorization')
@Controller(ERouteName.AUTH_ROUTE)
export class AuthController {
  constructor(private readonly authService: AuthService) {}
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
  async login(@Request() { user }: AuthReqDto): Promise<AccesResponseDto> {
    return this.authService.login(user);
  }
}

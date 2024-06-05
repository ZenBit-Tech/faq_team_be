import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import {
  ApiInternalServerErrorResponse,
  ApiOkResponse,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { AuthService } from 'src/modules/auth/auth.service';
import { AccesTokenDto } from 'src/modules/auth/dto/response/sign-in.dto';
import { LocalAuthGuard } from 'src/modules/auth/local-auth.guard';
import { AuthControllerDocStrings } from 'src/utils/constants/docsTexts';

import { ERouteName } from '../../common/enums/route-name.enum';
import { SignUpRequestDto } from './dto/request/sign-up.request.dto';
import { AuthReqDto } from './dto/response/sign-in.dto';

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
  @ApiOperation({ summary: AuthControllerDocStrings.operations.SIGNIN.summary })
  @ApiOkResponse({
    description: AuthControllerDocStrings.operations.SIGNIN.okResponse,
    type: SignUpRequestDto,
  })
  @ApiInternalServerErrorResponse({
    description: AuthControllerDocStrings.operations.SIGNIN.errorResponse,
  })
  async login(@Request() { user }: AuthReqDto): Promise<AccesTokenDto> {
    return this.authService.login(user);
  }
}

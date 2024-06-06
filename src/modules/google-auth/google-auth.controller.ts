import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import {
  ApiExtraModels,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  refs,
} from '@nestjs/swagger';
import { Response } from 'express';

import { ERouteName } from '../../common/enums/route-name.enum';
import { GoogleAuthResponseDto } from './dto/response/google-auth.response.dto';
import { GoogleAuthService } from './google-auth.service';
import { IGoogleAuth } from './interfaces/google.interfaces';

@ApiTags('Authorization via Google')
@Controller(ERouteName.GOOGLE_ROUTE)
export class GoogleAuthController {
  constructor(private readonly googleAuthService: GoogleAuthService) {}

  @ApiOperation({
    summary:
      'Endpoint that uses the previously created google guard, this endpoint will redirect the user to the Google login page',
  })
  @Get()
  @UseGuards(AuthGuard('google'))
  async googleAuth(@Req() req: unknown): Promise<void> {}

  @ApiOperation({ summary: 'Register or login via google' })
  @Get(ERouteName.GOOGLE_REDIRECT)
  @UseGuards(AuthGuard('google'))
  @ApiExtraModels(GoogleAuthResponseDto)
  @ApiOkResponse({
    schema: { anyOf: refs(GoogleAuthResponseDto) },
  })
  async googleAuthRedirect(
    @Req() req: IGoogleAuth,
    @Res({ passthrough: true }) res: Response,
  ): Promise<GoogleAuthResponseDto> {
    return await this.googleAuthService.googleLogin(req, res);
  }
}

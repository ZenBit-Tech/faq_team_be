import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { ERouteName } from '../../common/enums/route-name.enum';
import { GOOGLE_REGISTR_RES } from '../../utils/generalConstants';
import { EGoogLeAuthAction } from './enums/google-auth-action.enum';
import { GoogleAuthService } from './google-auth.service';
import { IGoogleAuth } from './interfaces/google.interfaces';

@ApiTags('Authorization via Google')
@Controller(ERouteName.GOOGLE_ROUTE)
export class GoogleAuthController {
  constructor(
    private readonly googleAuthService: GoogleAuthService,
    private readonly configService: ConfigService,
  ) {}

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
  async googleAuthRedirect(
    @Req() req: IGoogleAuth,
    @Res({ passthrough: true }) res: Response,
  ): Promise<void> {
    const { accessToken, authAction } = await this.googleAuthService.googleAuth(
      req,
      res,
    );

    authAction === EGoogLeAuthAction.SIGNUP
      ? res.redirect(
          `${this.configService.get<string>('FRONT_URL')}${GOOGLE_REGISTR_RES}${accessToken}`,
        )
      : res.redirect(`${this.configService.get<string>('FRONT_URL')}`);
  }
}

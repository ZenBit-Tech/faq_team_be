import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AuthGuard } from '@nestjs/passport';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Response } from 'express';

import { ERouteName } from 'src/common/enums/route-name.enum';
import { EGoogLeAuthAction } from 'src/modules/google-auth/enums/google-auth-action.enum';
import { GoogleAuthService } from 'src/modules/google-auth/google-auth.service';
import { IGoogleAuth } from 'src/modules/google-auth/interfaces/google.interfaces';
import { GOOGLE_REGISTR_RES } from 'src/utils/generalConstants';

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

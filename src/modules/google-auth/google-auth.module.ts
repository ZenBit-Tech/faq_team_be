import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { GoogleStrategy } from 'src/modules/google-auth/google.strategy';
import { GoogleAuthController } from 'src/modules/google-auth/google-auth.controller';
import { GoogleAuthService } from 'src/modules/google-auth/google-auth.service';

@Module({
  imports: [],
  controllers: [GoogleAuthController],
  providers: [GoogleAuthService, GoogleStrategy, JwtService],
})
export class GoogleAuthModule {}

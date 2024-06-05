import { Module } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { GoogleStrategy } from './google.strategy';
import { GoogleAuthController } from './google-auth.controller';
import { GoogleAuthService } from './google-auth.service';

@Module({
  imports: [],
  controllers: [GoogleAuthController],
  providers: [GoogleAuthService, GoogleStrategy, JwtService],
})
export class GoogleAuthModule {}

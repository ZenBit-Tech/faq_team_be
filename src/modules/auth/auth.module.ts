import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from 'src/modules/auth/auth.controller';
import { AuthService } from 'src/modules/auth/services/auth.service';
import { MailModule } from 'src/modules/mail/mail.module';
import { UserModule } from 'src/modules/user/user.module';
import { SIGNIN_EXPIRATION_TIME } from 'src/utils/generalConstants';

import { OtpService } from './services/otp.service';
import { SuperAdminSeedService } from './services/super-admin-seed.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { LocalStrategy } from './strategies/local.strategy';

@Module({
  imports: [
    UserModule,
    MailModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: SIGNIN_EXPIRATION_TIME },
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [
    AuthService,
    OtpService,
    LocalStrategy,
    JwtStrategy,
    SuperAdminSeedService,
  ],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}

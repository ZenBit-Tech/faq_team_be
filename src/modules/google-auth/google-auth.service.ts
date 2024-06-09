import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';

import { UserRepository } from '../repository/services/user.repository';
import { EGoogLeAuthAction } from './enums/google-auth-action.enum';
import { IGoogleAuth, IGoogleAuthRes } from './interfaces/google.interfaces';

@Injectable()
export class GoogleAuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  public async googleAuth(
    req: IGoogleAuth,
    res: Response,
  ): Promise<IGoogleAuthRes> {
    let accessToken: string;
    let authAction = EGoogLeAuthAction.SIGNIN;

    const secret = this.configService.get<string>('JWT_SECRET');
    const expiresIn = this.configService.get<string>('JWT_EXPIRES');

    const { email, firstName, lastName } = req.user;

    const isUser = await this.userRepository.findOneBy({ email });

    if (!isUser) {
      authAction = EGoogLeAuthAction.SIGNUP;

      const user = await this.userRepository.save(
        this.userRepository.create({
          full_name: `${firstName} ${lastName}`,
          email,
          is_verified: true,
        }),
      );

      accessToken = this.jwtService.sign(
        {
          email: user.email,
          user_id: user.id,
        },
        { secret, expiresIn },
      );

      return { accessToken, authAction };
    }

    if (!isUser.is_verified) {
      await this.userRepository.update(
        { email: isUser.email },
        {
          is_verified: true,
        },
      );
    }

    accessToken = this.jwtService.sign(
      {
        email: isUser.email,
        user_id: isUser.id,
      },
      { secret, expiresIn },
    );

    res.cookie('access_token', accessToken, {
      maxAge: 2592000000, // 30 days in milliseconds
      sameSite: true,
      secure: false, // Set to true if using HTTPS in production
    });

    return { accessToken, authAction };
  }
}

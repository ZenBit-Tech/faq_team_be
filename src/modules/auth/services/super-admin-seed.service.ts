import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { SuperAdminConfig } from 'src/modules/auth/types/super-admin.type';
import { UserRepository } from 'src/modules/repository/services/user.repository';

import { EUserRole } from '../../../common/enums/user-role.enum';

@Injectable()
export class SuperAdminSeedService implements OnModuleInit {
  private superAdminConfig: SuperAdminConfig;

  constructor(
    private readonly userRepository: UserRepository,
    private readonly configService: ConfigService,
  ) {
    this.superAdminConfig = {
      full_name: this.configService.get<string>('ADMIN_NAME'),
      email: this.configService.get<string>('ADMIN_EMAIL'),
      password: this.configService.get<string>('ADMIN_PASSWORD'),
    };
  }

  async onModuleInit(): Promise<void> {
    const isExist = await this.userRepository.findOneBy({
      email: this.superAdminConfig.email,
    });

    if (isExist) {
      return;
    }
    const salt = +this.configService.get<string>('SALT');
    const hashedPassword = await bcrypt.hash(
      this.superAdminConfig.password,
      salt,
    );

    await this.userRepository.save(
      this.userRepository.create({
        full_name: this.superAdminConfig.full_name,
        email: this.superAdminConfig.email,
        password: hashedPassword,
        user_role: EUserRole.SUPERADMIN,
        is_verified: true,
      }),
    );
  }
}

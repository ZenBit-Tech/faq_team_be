import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MysqlModule } from 'src/common/configs/database/mysql.module';

import { AuthModule } from './modules/auth/auth.module';
import { GoogleAuthModule } from './modules/google-auth/google-auth.module';
import { RepositoryModule } from './modules/repository/repository.module';
import { UserModule } from './modules/user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
    }),
    MysqlModule,
    AuthModule,
    GoogleAuthModule,
    UserModule,
    RepositoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

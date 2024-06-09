import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MysqlModule } from 'src/common/configs/database/mysql.module';
import { AuthModule } from 'src/modules/auth/auth.module';
import { GoogleAuthModule } from 'src/modules/google-auth/google-auth.module';
import { RepositoryModule } from 'src/modules/repository/repository.module';
import { UserModule } from 'src/modules/user/user.module';

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

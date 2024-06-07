import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';
import * as path from 'path';
import * as process from 'process';
import { DB_TYPE } from 'src/utils/generalConstants';

@Injectable()
export class MysqlService implements TypeOrmOptionsFactory {
  constructor(private readonly configService: ConfigService) {}
  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: DB_TYPE,
      host: this.configService.get<string>('DB_HOST'),
      port: this.configService.get<number>('DB_PORT'),
      username: this.configService.get<string>('DB_USER'),
      password: this.configService.get<string>('DB_PASSWORD'),
      database: this.configService.get<string>('DB_NAME'),
      entities: [
        path.join(process.cwd(), 'dist', 'src', 'entities', '*.entity.js'),
      ],
      migrations: [
        path.join(process.cwd(), 'dist', 'src', 'migrations', '*.js'),
      ],
      migrationsRun: true,
      synchronize: false,
    };
  }
}

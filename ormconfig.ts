import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import * as path from 'path';
import * as process from 'process';
import { DataSource } from 'typeorm';

import { DB_TYPE } from './src/utils/generalConstants';

config();

const configService = new ConfigService();
export default new DataSource({
  type: DB_TYPE,
  port: configService.get<number>('DB_PORT'),
  username: configService.get<string>('DB_USER'),
  password: configService.get<string>('DB_PASSWORD'),
  database: configService.get<string>('DB_NAME'),
  entities: [path.join(process.cwd(), 'src', 'entities', '*.entity.ts')],
  migrations: [path.join(process.cwd(), 'src', 'migrations', '*.ts')],
  synchronize: false,
});

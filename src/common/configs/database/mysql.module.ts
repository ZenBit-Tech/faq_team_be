import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { MysqlService } from 'src/common/configs/database/mysql.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: MysqlService,
    }),
  ],
})
export class MysqlModule {}

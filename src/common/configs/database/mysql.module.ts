import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DbSeedService } from 'src/common/configs/database/db-seed.service';
import { MysqlService } from 'src/common/configs/database/mysql.service';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useClass: MysqlService,
    }),
  ],
  providers: [DbSeedService],
})
export class MysqlModule {}

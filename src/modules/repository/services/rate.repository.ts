import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { RateEntity } from 'src/entities/rate.entity';

@Injectable()
export class RateRepository extends Repository<RateEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(RateEntity, dataSource.manager);
  }
}

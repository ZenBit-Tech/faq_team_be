import { Injectable } from '@nestjs/common';
import { RateEntity } from 'src/entities/rate.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class RateRepository extends Repository<RateEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(RateEntity, dataSource.manager);
  }
}

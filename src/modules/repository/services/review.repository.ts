import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ReviewEntity } from 'src/entities/review.entity';

@Injectable()
export class ReviewRepository extends Repository<ReviewEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ReviewEntity, dataSource.manager);
  }
}

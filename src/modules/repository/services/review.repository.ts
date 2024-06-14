import { Injectable } from '@nestjs/common';
import { ReviewEntity } from 'src/entities/review.entity';
import { DataSource, Repository } from 'typeorm';

@Injectable()
export class ReviewRepository extends Repository<ReviewEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ReviewEntity, dataSource.manager);
  }
}

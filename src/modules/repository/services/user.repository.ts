import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { UserEntity } from 'src/entities/user.entity';

@Injectable()
export class UserRepository extends Repository<UserEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(UserEntity, dataSource.manager);
  }

  public async getFullInfo(id: string) {
    const qb = this.createQueryBuilder('user');
    qb.leftJoinAndSelect(
      'user.user_reviews',
      'user_reviews',
      'user.id = user_reviews.author',
    );

    qb.leftJoin(
      'user_reviews.review_target',
      'review_target',
      'user_reviews.review_target_id = review_target.id',
    ).addSelect(['review_target.id', 'review_target.full_name']);

    qb.where('user.id = :id', { id });

    return await qb.getOne();
  }
}

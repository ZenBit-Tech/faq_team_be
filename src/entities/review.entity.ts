import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { ETableName } from '../common/enums/table-name.enum';
import { BaseEntity } from './models/base.entity';
import { UserEntity } from './user.entity';

@Entity(ETableName.REVIEWS)
export class ReviewEntity extends BaseEntity {
  @Column()
  review_body: string;

  @Column()
  reviewer_id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.user_reviews)
  @JoinColumn({ name: 'reviewer_id' })
  author?: UserEntity;

  @Column()
  review_target_id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.review_targets)
  @JoinColumn({ name: 'review_target_id' })
  review_target?: UserEntity;
}

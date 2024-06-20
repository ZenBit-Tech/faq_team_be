import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { ETableName } from '../common/enums/table-name.enum';
import { BaseEntity } from './models/base.entity';
import { UserEntity } from './user.entity';

@Entity(ETableName.FOLLOWS)
export class FollowEntity extends BaseEntity {
  @Column()
  follower_id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.followers)
  @JoinColumn({ name: 'follower_id' })
  follower?: UserEntity;

  @Column()
  following_id: string;
  @ManyToOne(() => UserEntity, (entity) => entity.followings)
  @JoinColumn({ name: 'following_id' })
  following?: UserEntity;
}

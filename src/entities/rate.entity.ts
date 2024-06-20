import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { ETableName } from '../common/enums/table-name.enum';
import { DEFAULT_USER_RATE } from '../utils/generalConstants';
import { BaseEntity } from './models/base.entity';
import { UserEntity } from './user.entity';

@Entity(ETableName.RATES)
export class RateEntity extends BaseEntity {
  @Column({ default: DEFAULT_USER_RATE })
  rate: number;

  @Column()
  rater_id: string;

  @ManyToOne(() => UserEntity, (entity) => entity.rates)
  @JoinColumn({ name: 'rater_id' })
  rates?: UserEntity;

  @Column()
  user_target_id: string;

  @ManyToOne(() => UserEntity, (entity) => entity.rate_targets)
  @JoinColumn({ name: 'user_target_id' })
  user_target?: UserEntity;
}

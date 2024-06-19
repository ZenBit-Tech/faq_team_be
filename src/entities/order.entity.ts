import { Column, Entity } from 'typeorm';

import { ETableName } from '../common/enums/table-name.enum';
import { BaseEntity } from '../entities/models/base.entity';

@Entity(ETableName.ORDERS)
export class OrderEntity extends BaseEntity {
  @Column()
  product_id: number;

  @Column()
  buyer_id: number;
}

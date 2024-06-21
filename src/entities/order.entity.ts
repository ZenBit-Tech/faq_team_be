import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

import { ETableName } from '../common/enums/table-name.enum';
import { BaseEntity } from '../entities/models/base.entity';
import { ProductEntity } from './product.entity';
import { UserEntity } from './user.entity';

@Entity(ETableName.ORDERS)
export class OrderEntity extends BaseEntity {
  @Column()
  product_id: string;

  @Column()
  buyer_id: string;

  @Column({ type: 'double' })
  price: number;

  @ManyToOne(() => ProductEntity, (product) => product.orders)
  @JoinColumn({ name: 'product_id' })
  product: ProductEntity;

  @ManyToOne(() => UserEntity, (user) => user.orders)
  @JoinColumn({ name: 'buyer_id' })
  buyer: UserEntity;
}

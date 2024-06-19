import { Column, Entity, OneToMany } from 'typeorm';

import { ETableName } from '../common/enums/table-name.enum';
import { BaseEntity } from '../entities/models/base.entity';
import { OrderEntity } from './order.entity';

@Entity(ETableName.PRODUCTS)
export class ProductEntity extends BaseEntity {
  @Column()
  vendor_id: string;

  @Column()
  product_name: string;

  @Column()
  description: string;

  @Column()
  quantity: number;

  @Column({ type: 'double' })
  price: number;

  @Column()
  category: string;

  @Column({ nullable: true })
  image: string;

  @OneToMany(() => OrderEntity, (entity) => entity.product_id)
  orders?: OrderEntity[];
}

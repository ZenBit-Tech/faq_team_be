import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

import { ETableName } from '../common/enums/table-name.enum';
import { BaseEntity } from '../entities/models/base.entity';
import { OrderEntity } from './order.entity';
import { UserEntity } from './user.entity';

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

  @Column()
  color: string;

  @Column()
  size: string;

  @Column()
  style: string;

  @Column({ nullable: true })
  image: string;

  @OneToMany(() => OrderEntity, (order) => order.product)
  orders: OrderEntity[];

  @ManyToOne(() => UserEntity, (user) => user.products)
  @JoinColumn({ name: 'vendor_id' })
  owner: UserEntity;
}

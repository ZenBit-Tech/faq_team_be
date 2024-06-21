import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ProductEntity } from 'src/entities/product.entity';

@Injectable()
export class ProductRepository extends Repository<ProductEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ProductEntity, dataSource.manager);
  }

  public async findAll() {
    const qb = this.createQueryBuilder('product');
    qb.leftJoin(
      'product.owner',
      'owner',
      'product.vendor_id = owner.id',
    ).addSelect(['owner.full_name', 'owner.id']);

    return qb.getMany();
  }
}

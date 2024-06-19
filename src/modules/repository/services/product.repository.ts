import { Injectable } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';

import { ProductEntity } from 'src/entities/product.entity';

@Injectable()
export class ProductRepository extends Repository<ProductEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ProductEntity, dataSource.manager);
  }
}

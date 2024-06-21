import { Injectable } from '@nestjs/common';

import { ProductEntity } from 'src/entities/product.entity';
import { ProductRepository } from 'src/modules/repository/services/product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  public async getAllProducts(): Promise<ProductEntity[]> {
    return await this.productRepository.find();
  }
}

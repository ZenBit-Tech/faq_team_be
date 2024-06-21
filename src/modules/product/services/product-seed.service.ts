import { Injectable, OnModuleInit } from '@nestjs/common';

import { ProductRepository } from 'src/modules/repository/services/product.repository';
import { products } from 'src/utils/constants/fakeProducts';

@Injectable()
export class ProductSeederService implements OnModuleInit {
  constructor(private readonly productRepository: ProductRepository) {}

  async onModuleInit() {
    const isProductsExist = await this.productRepository.find();
    if (!isProductsExist.length) {
      await this.productRepository.save(products);
    }
  }
}

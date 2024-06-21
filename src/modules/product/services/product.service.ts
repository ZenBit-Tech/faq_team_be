import { Injectable } from '@nestjs/common';

import { ProductEntity } from 'src/entities/product.entity';
import { ProductsFilterDto } from 'src/modules/product/dto/filter-products.dto';
import { ProductRepository } from 'src/modules/repository/services/product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  public async getAllProducts(
    dto: ProductsFilterDto,
  ): Promise<{ totalCount: number; products: ProductEntity[] }> {
    return await this.productRepository.getAllProducts(dto);
  }
}

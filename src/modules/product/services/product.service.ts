import { Injectable } from '@nestjs/common';

import { ProductsFilterDto } from 'src/modules/product/dto/filter-products.dto';
import { GetAllProductsOutput } from 'src/modules/product/types/get-all-products.type';
import { ProductRepository } from 'src/modules/repository/services/product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  public async getAllProducts(
    dto: ProductsFilterDto,
  ): Promise<GetAllProductsOutput> {
    return await this.productRepository.getAllProducts(dto);
  }
}

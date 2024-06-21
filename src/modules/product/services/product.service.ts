import { Injectable } from '@nestjs/common';

import { ProductsFilterDto } from 'src/modules/product/dto/filter-products.request.dto';
import { ProductsFilterResponseDto } from 'src/modules/product/dto/filter-products.response.dto';
import { ProductRepository } from 'src/modules/repository/services/product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  public async getAllProducts(
    dto: ProductsFilterDto,
  ): Promise<ProductsFilterResponseDto> {
    return await this.productRepository.getAllProducts(dto);
  }
}

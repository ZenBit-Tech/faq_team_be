import { Injectable } from '@nestjs/common';
import { Brackets } from 'typeorm';

import { ProductEntity } from 'src/entities/product.entity';
import { ProductsFilterDto } from 'src/modules/product/dto/filter-products.dto';
import { ProductRepository } from 'src/modules/repository/services/product.repository';

@Injectable()
export class ProductService {
  constructor(private readonly productRepository: ProductRepository) {}

  public async getAllProducts(
    dto: ProductsFilterDto,
  ): Promise<{ totalCount: number; products: ProductEntity[] }> {
    const {
      page = 1,
      limit = 5,
      search = '',
      size,
      style,
      color,
      priceRange,
      order = 'ASC',
    } = dto;

    const queryBuilder = this.productRepository.createQueryBuilder('product');

    if (search) {
      queryBuilder.andWhere(
        new Brackets((qb) => {
          qb.where('product.product_name LIKE :search', {
            search: `%${search}%`,
          }).orWhere('product.description LIKE :search', {
            search: `%${search}%`,
          });
        }),
      );
    }

    if (size) {
      queryBuilder.andWhere('product.size = :size', { size });
    }

    if (style) {
      queryBuilder.andWhere('product.style = :style', { style });
    }

    if (color) {
      queryBuilder.andWhere('product.color = :color', { color });
    }

    if (priceRange) {
      if (priceRange.min !== undefined) {
        queryBuilder.andWhere('product.price >= :minPrice', {
          minPrice: priceRange.min,
        });
      }
      if (priceRange.max !== undefined) {
        queryBuilder.andWhere('product.price <= :maxPrice', {
          maxPrice: priceRange.max,
        });
      }
    }

    queryBuilder
      .orderBy('product.name', order)
      .skip(limit ? (page - 1) * limit : 0)
      .take(limit);

    const [products, totalCount] = await queryBuilder.getManyAndCount();

    return { totalCount, products };
  }
}

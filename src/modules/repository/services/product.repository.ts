import { Injectable } from '@nestjs/common';
import { Brackets, DataSource, Repository } from 'typeorm';

import { ESort } from 'src/common/enums/sort.enum';
import { ProductEntity } from 'src/entities/product.entity';
import { ProductsFilterDto } from 'src/modules/product/dto/filter-products.dto';
import { GetAllProductsOutput } from 'src/modules/product/types/get-all-products.type';

@Injectable()
export class ProductRepository extends Repository<ProductEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(ProductEntity, dataSource.manager);
  }
  public async getAllProducts(
    dto: ProductsFilterDto,
  ): Promise<GetAllProductsOutput> {
    const {
      page = 1,
      limit = 5,
      search = '',
      size,
      style,
      color,
      min,
      max,
      order = ESort.ASC,
    } = dto;

    const queryBuilder = this.createQueryBuilder('product');

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

    if (min) {
      queryBuilder.andWhere('product.price >= :minPrice', {
        minPrice: min,
      });
    }
    if (max) {
      queryBuilder.andWhere('product.price <= :maxPrice', {
        maxPrice: max,
      });
    }

    queryBuilder
      .orderBy('product.product_name', order)
      .skip(limit ? (page - 1) * limit : 0)
      .take(limit);

    const [products, totalCount] = await queryBuilder.getManyAndCount();

    return { totalCount, products };
  }
}

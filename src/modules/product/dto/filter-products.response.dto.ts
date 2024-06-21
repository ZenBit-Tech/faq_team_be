import { ApiProperty } from '@nestjs/swagger';

import { ProductEntity } from 'src/entities/product.entity';

export class ProductsFilterResponseDto {
  @ApiProperty()
  products: ProductEntity[];

  @ApiProperty()
  totalCount: number;
}

import { ProductEntity } from 'src/entities/product.entity';

export type GetAllProductsOutput = {
  totalCount: number;
  products: ProductEntity[];
};

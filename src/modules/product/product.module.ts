import { Module } from '@nestjs/common';

import { ProductController } from 'src/modules/product/product.controller';
import { ProductService } from 'src/modules/product/product.service';

@Module({
  imports: [],
  providers: [ProductService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}

import { Module } from '@nestjs/common';

import { ProductSeederService } from 'src/modules/product//services/product-seed.service';
import { ProductController } from 'src/modules/product/product.controller';
import { ProductService } from 'src/modules/product/services/product.service';

@Module({
  imports: [],
  providers: [ProductService, ProductSeederService],
  controllers: [ProductController],
  exports: [ProductService],
})
export class ProductModule {}

import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

import { ERouteName } from 'src/common/enums/route-name.enum';
import { OrderEntity } from 'src/entities/order.entity';
import { ProductEntity } from 'src/entities/product.entity';
import { ProductService } from 'src/modules/product/product.service';

@ApiTags('Product')
@Controller(ERouteName.PRODUCTS_ROUTE)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get(ERouteName.GET_PRODUCTS_ROUTE)
  @HttpCode(HttpStatus.OK)
  async getAllProducts(): Promise<ProductEntity[]> {
    return await this.productService.getAllProducts();
  }

  @Get(ERouteName.GET_ORDERS_ROUTE)
  @HttpCode(HttpStatus.OK)
  async getAllOrders(): Promise<OrderEntity[]> {
    return await this.productService.getAllOrders();
  }
}

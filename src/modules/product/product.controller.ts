import { Controller, Get, HttpCode, HttpStatus, Query } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ERouteName } from 'src/common/enums/route-name.enum';
import { ProductsFilterDto } from 'src/modules/product/dto/filter-products.request.dto';
import { ProductsFilterResponseDto } from 'src/modules/product/dto/filter-products.response.dto';
import { ProductService } from 'src/modules/product/services/product.service';

@ApiTags('Product')
@Controller(ERouteName.PRODUCTS_ROUTE)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiBearerAuth()
  @Get(ERouteName.GET_PRODUCTS_ROUTE)
  @HttpCode(HttpStatus.OK)
  async getAllProducts(
    @Query() query: ProductsFilterDto,
  ): Promise<ProductsFilterResponseDto> {
    return await this.productService.getAllProducts(query);
  }
}

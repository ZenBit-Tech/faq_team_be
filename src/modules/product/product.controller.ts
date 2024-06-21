import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  //  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ERouteName } from 'src/common/enums/route-name.enum';
import { ProductsFilterDto } from 'src/modules/product/dto/filter-products.dto';
// import { JwtAuthGuard } from 'src/modules/auth/guards/jwtAuthGuard';
import { ProductService } from 'src/modules/product/services/product.service';
import { GetAllProductsOutput } from 'src/modules/product/types/get-all-products.type';

@ApiTags('Product')
@Controller(ERouteName.PRODUCTS_ROUTE)
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @ApiBearerAuth()
  @Get(ERouteName.GET_PRODUCTS_ROUTE)
  @HttpCode(HttpStatus.OK)
  async getAllProducts(
    @Query() query: ProductsFilterDto,
  ): Promise<GetAllProductsOutput> {
    return await this.productService.getAllProducts(query);
  }
}

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
import { ProductEntity } from 'src/entities/product.entity';
import { ProductsFilterDto } from 'src/modules/product/dto/filter-products.dto';
// import { JwtAuthGuard } from 'src/modules/auth/guards/jwtAuthGuard';
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
  ): Promise<{ totalCount: number; products: ProductEntity[] }> {
    return await this.productService.getAllProducts(query);
  }
}

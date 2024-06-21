import {
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

import { ERouteName } from 'src/common/enums/route-name.enum';
import { OrderEntity } from 'src/entities/order.entity';
import { ProductEntity } from 'src/entities/product.entity';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwtAuthGuard';
import { OrderService } from 'src/modules/order/order.service';

@ApiTags('Order')
@Controller(ERouteName.ORDERS_ROUTE)
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  //TODO: move this route to product modules when it is created (it is here for testing)
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(ERouteName.GET_PRODUCTS_ROUTE)
  @HttpCode(HttpStatus.OK)
  async getAllProducts(): Promise<ProductEntity[]> {
    return await this.orderService.getAllProducts();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(ERouteName.GET_ORDERS_ROUTE)
  @HttpCode(HttpStatus.OK)
  async getAllOrders(): Promise<OrderEntity[]> {
    return await this.orderService.getAllOrders();
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(ERouteName.GET_TOTAL_SALES_ROUTE)
  @HttpCode(HttpStatus.OK)
  async getTotalSales(
    @Query('userId') userId: string,
  ): Promise<{ totalSales: number; lastWeekPercentage: number }> {
    return await this.orderService.getTotalSales(userId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(ERouteName.GET_AVERAGE_SALES_ROUTE)
  @HttpCode(HttpStatus.OK)
  async getAverageSales(
    @Query('userId') userId: string,
  ): Promise<{ averageSales: number; lastWeekAveragePercentage: number }> {
    return await this.orderService.getAverageSales(userId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(ERouteName.GET_NUMBER_OF_ORDERS_ROUTE)
  @HttpCode(HttpStatus.OK)
  async getNumberOfOrders(
    @Query('userId') userId: string,
  ): Promise<{ totalOrders: number; lastWeekOrderPercentage: number }> {
    return await this.orderService.getNumberOfOrders(userId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(ERouteName.GET_TOTAL_SALES_PER_MONTH)
  @HttpCode(HttpStatus.OK)
  async getTotalSalesPerMonth(
    @Query('userId') userId: string,
  ): Promise<{ month: number; total: number }[]> {
    return await this.orderService.getTotalSalesPerMonth(userId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(ERouteName.GET_TOTAL_SALES_FOR_CATEGORIES)
  @HttpCode(HttpStatus.OK)
  async getTotalSalesForCategories(
    @Query('userId') userId: string,
  ): Promise<{ category: string; totalSales: number; orderCount: number }[]> {
    return await this.orderService.getTotalSalesForCategories(userId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(ERouteName.GET_LAST_ORDERS)
  @HttpCode(HttpStatus.OK)
  async getLastOrders(@Query('userId') userId: string): Promise<OrderEntity[]> {
    return await this.orderService.getLastOrders(userId);
  }
}

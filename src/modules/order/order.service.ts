import { Injectable } from '@nestjs/common';

import { OrderEntity } from 'src/entities/order.entity';
import { OrderRepository } from 'src/modules/repository/services/order.repository';

@Injectable()
export class OrderService {
  constructor(private readonly orderRepository: OrderRepository) {}
  public async getAllOrders(): Promise<OrderEntity[]> {
    return await this.orderRepository.find();
  }

  public async getTotalSales(
    userId: string,
  ): Promise<{ totalSales: number; lastWeekPercentage: number }> {
    return await this.orderRepository.getTotalSalesForUser(userId);
  }

  public async getAverageSales(
    userId: string,
  ): Promise<{ averageSales: number; lastWeekAveragePercentage: number }> {
    return await this.orderRepository.getAverageSalesForUser(userId);
  }

  public async getNumberOfOrders(
    userId: string,
  ): Promise<{ totalOrders: number; lastWeekOrderPercentage: number }> {
    return await this.orderRepository.getNumberOfOrdersForUser(userId);
  }

  public async getTotalSalesPerMonth(
    userId: string,
  ): Promise<{ month: number; total: number }[]> {
    return await this.orderRepository.getTotalSalesPerMonth(userId);
  }

  public async getTotalSalesForCategories(
    userId: string,
  ): Promise<{ category: string; totalSales: number; orderCount: number }[]> {
    return await this.orderRepository.getTotalSalesForTopCategoriesForUser(
      userId,
    );
  }

  public async getLastOrders(userId: string): Promise<OrderEntity[]> {
    return await this.orderRepository.getOrdersForLastThreeDays(userId);
  }
}

import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataSource, Repository, SelectQueryBuilder } from 'typeorm';

import { EErrorMessage } from 'src/common/enums/error-message.enum';
import { OrderEntity } from 'src/entities/order.entity';

@Injectable()
export class OrderRepository extends Repository<OrderEntity> {
  constructor(private readonly dataSource: DataSource) {
    super(OrderEntity, dataSource.manager);
  }

  private async executeQuery<T>(
    queryBuilder: SelectQueryBuilder<OrderEntity>,
  ): Promise<T> {
    const result = await queryBuilder.getRawOne();
    if (!result) {
      throw new HttpException(
        EErrorMessage.QUERY_FAILED,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
    return result;
  }

  private getQueryBuilder(
    userId: string,
    selectField: string,
    aggregate: string,
    extraConditions: string[] = [],
  ): SelectQueryBuilder<OrderEntity> {
    const qb = this.createQueryBuilder('order');

    qb.innerJoin('order.product', 'product')
      .innerJoin('product.owner', 'user')
      .select(`${aggregate}(order.${selectField})`, 'result')
      .where('user.id = :userId', { userId });

    extraConditions.forEach((condition) => qb.andWhere(condition));
    return qb;
  }

  private getPercentage(allTime: number, lastWeek: number): number {
    return allTime ? (lastWeek / allTime - 1) * 100 : 0;
  }

  public async getTotalSalesForUser(
    userId: string,
  ): Promise<{ totalSales: number; lastWeekPercentage: number }> {
    const qbAllTime = this.getQueryBuilder(userId, 'price', 'SUM');

    const resultAllTime = await this.executeQuery<{ result: string }>(
      qbAllTime,
    );

    const totalSalesAllTime = parseFloat(resultAllTime.result) || 0;

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const qbLastWeek = this.getQueryBuilder(userId, 'price', 'SUM', [
      'order.created_at >= :oneWeekAgo',
    ]);
    const resultLastWeek = await this.executeQuery<{ result: string }>(
      qbLastWeek.setParameters({ oneWeekAgo }),
    );

    const totalSalesLastWeek = parseFloat(resultLastWeek.result) || 0;

    return {
      totalSales: totalSalesAllTime,
      lastWeekPercentage: this.getPercentage(
        totalSalesAllTime,
        totalSalesLastWeek,
      ),
    };
  }

  public async getNumberOfOrdersForUser(
    userId: string,
  ): Promise<{ totalOrders: number; lastWeekOrderPercentage: number }> {
    const qbAllTime = this.getQueryBuilder(userId, 'id', 'COUNT');

    const resultAllTime = await this.executeQuery<{ result: string }>(
      qbAllTime,
    );

    const totalOrdersAllTime = parseFloat(resultAllTime.result) || 0;

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const qbLastWeek = this.getQueryBuilder(userId, 'id', 'COUNT', [
      'order.created_at >= :oneWeekAgo',
    ]);
    const resultLastWeek = await this.executeQuery<{ result: string }>(
      qbLastWeek.setParameters({ oneWeekAgo }),
    );
    const totalOrdersLastWeek = parseFloat(resultLastWeek.result) || 0;

    return {
      totalOrders: totalOrdersAllTime,
      lastWeekOrderPercentage: this.getPercentage(
        totalOrdersAllTime,
        totalOrdersLastWeek,
      ),
    };
  }

  public async getAverageSalesForUser(
    userId: string,
  ): Promise<{ averageSales: number; lastWeekAveragePercentage: number }> {
    const qbAllTime = this.getQueryBuilder(userId, 'price', 'AVG');

    const resultAllTime = await this.executeQuery<{ result: string }>(
      qbAllTime,
    );

    const averageSalesAllTime = parseFloat(resultAllTime.result) || 0;

    const oneWeekAgo = new Date();
    oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);

    const qbLastWeek = this.getQueryBuilder(userId, 'price', 'AVG', [
      'order.created_at >= :oneWeekAgo',
    ]);
    const resultLastWeek = await this.executeQuery<{ result: string }>(
      qbLastWeek.setParameters({ oneWeekAgo }),
    );

    const averageSalesLastWeek = parseFloat(resultLastWeek.result) || 0;

    return {
      averageSales: averageSalesAllTime,
      lastWeekAveragePercentage: this.getPercentage(
        averageSalesAllTime,
        averageSalesLastWeek,
      ),
    };
  }

  public async getTotalSalesPerMonth(
    userId: string,
  ): Promise<{ month: string; total: number }[]> {
    const qb = this.createQueryBuilder('order');
    qb.innerJoin('order.product', 'product')
      .innerJoin('product.owner', 'user')
      .select('DATE_FORMAT(order.created_at, "%Y-%m")', 'month')
      .addSelect('SUM(order.price)', 'total')
      .where('user.id = :userId', { userId })
      .andWhere('order.created_at >= DATE_SUB(CURDATE(), INTERVAL 1 YEAR)')
      .groupBy('month')
      .orderBy('month', 'ASC');

    const result =
      await this.executeQuery<{ month: string; total: string }[]>(qb);

    return result.map((row) => ({
      month: row.month,
      total: parseFloat(row.total),
    }));
  }

  public async getTotalSalesForTopCategoriesForUser(
    userId: string,
  ): Promise<{ category: string; totalSales: number; orderCount: number }[]> {
    const qb = this.createQueryBuilder('order');
    qb.innerJoin('order.product', 'product')
      .innerJoin('product.owner', 'user')
      .select('product.category', 'category')
      .addSelect('SUM(order.price)', 'totalSales')
      .addSelect('COUNT(order.id)', 'orderCount')
      .where('user.id = :userId', { userId })
      .groupBy('product.category')
      .orderBy('totalSales', 'DESC')
      .limit(4);

    const result =
      await this.executeQuery<
        { category: string; totalSales: string; orderCount: string }[]
      >(qb);

    return result.map((row) => ({
      category: row.category,
      totalSales: parseFloat(row.totalSales),
      orderCount: parseInt(row.orderCount, 10),
    }));
  }

  public async getOrdersForLastThreeDays(
    userId: string,
  ): Promise<OrderEntity[]> {
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

    const qb = this.createQueryBuilder('order');
    qb.innerJoin('order.product', 'product')
      .innerJoin('product.owner', 'user')
      .where('user.id = :userId', { userId })
      .andWhere('order.created_at >= :threeDaysAgo', { threeDaysAgo });

    const orders = await this.executeQuery<OrderEntity[]>(qb);

    return orders;
  }
}

import { Injectable } from '@nestjs/common';

import { OrderEntity } from 'src/entities/order.entity';
import { ProductEntity } from 'src/entities/product.entity';
import { OrderRepository } from 'src/modules/repository/services/order.repository';
import { ProductRepository } from 'src/modules/repository/services/product.repository';

@Injectable()
export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly orderRepository: OrderRepository,
  ) {}

  public async getAllProducts(): Promise<ProductEntity[]> {
    const products = this.productRepository.find();
    return products;
  }

  public async getAllOrders(): Promise<OrderEntity[]> {
    const orders = this.orderRepository.find();
    return orders;
  }
}

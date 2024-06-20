import { Module } from '@nestjs/common';

import { OrderController } from 'src/modules/product/order.controller';
import { OrderService } from 'src/modules/product/order.service';

@Module({
  imports: [],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}

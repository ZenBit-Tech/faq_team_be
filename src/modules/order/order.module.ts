import { Module } from '@nestjs/common';

import { OrderController } from 'src/modules/order/order.controller';
import { OrderService } from 'src/modules/order/order.service';

@Module({
  imports: [],
  providers: [OrderService],
  controllers: [OrderController],
  exports: [OrderService],
})
export class OrderModule {}

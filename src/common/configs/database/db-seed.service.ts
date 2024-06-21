import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { Not } from 'typeorm';

import { EUserRole } from 'src/common/enums/user-role.enum';
import { OrderRepository } from 'src/modules/repository/services/order.repository';
import { ProductRepository } from 'src/modules/repository/services/product.repository';
import { RateRepository } from 'src/modules/repository/services/rate.repository';
import { ReviewRepository } from 'src/modules/repository/services/review.repository';
import { UserRepository } from 'src/modules/repository/services/user.repository';
import { orders } from 'src/utils/constants/fakeOrders';
import { products } from 'src/utils/constants/fakeProducts';
import { rates } from 'src/utils/constants/fakeRates';
import { reviews } from 'src/utils/constants/fakeReviews';
import { users } from 'src/utils/constants/fakeUsers';

@Injectable()
export class DbSeedService implements OnModuleInit {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly productRepository: ProductRepository,
    private readonly orderRepository: OrderRepository,
    private readonly rateRepository: RateRepository,
    private readonly reviewRepository: ReviewRepository,

    private readonly configService: ConfigService,
  ) {}

  async onModuleInit() {
    const isUsersExist = await this.userRepository.find({
      where: { user_role: Not(EUserRole.SUPERADMIN) },
    });
    if (isUsersExist.length) return;
    for (const user of users) {
      const salt = +this.configService.get<string>('SALT');
      user.password = await bcrypt.hash(user.password, salt);
    }

    await this.userRepository.save(users);

    const isProductsExist = await this.productRepository.find();
    if (!isProductsExist.length) {
      await this.productRepository.save(products);
    }

    const isOrdersExist = await this.orderRepository.find();
    if (!isOrdersExist.length) {
      await this.orderRepository.save(orders);
    }

    const isRatesExist = await this.rateRepository.find();
    if (!isRatesExist.length) {
      await this.rateRepository.save(rates);
    }

    const isReviewsExist = await this.reviewRepository.find();
    if (!isReviewsExist.length) {
      await this.reviewRepository.save(reviews);
    }
  }
}

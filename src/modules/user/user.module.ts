import { Module } from '@nestjs/common';
import { RateService } from 'src/modules/user/services/rate.service';
import { ReviewService } from 'src/modules/user/services/review.service';
import { UserService } from 'src/modules/user/services/user.service';
import { UserController } from 'src/modules/user/user.controller';

import { S3Service } from './services/aws.service';

@Module({
  imports: [],
  providers: [UserService, RateService, ReviewService, S3Service],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}

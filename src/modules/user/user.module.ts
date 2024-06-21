import { Module } from '@nestjs/common';

import { FollowService } from 'src/modules/user/services/follow.service';
import { RateService } from 'src/modules/user/services/rate.service';
import { ReviewService } from 'src/modules/user/services/review.service';
import { S3Service } from 'src/modules/user/services/s3.service';
import { UserService } from 'src/modules/user/services/user.service';
import { UserController } from 'src/modules/user/user.controller';

@Module({
  imports: [],

  providers: [
    UserService,
    RateService,
    ReviewService,
    FollowService,
    S3Service,
  ],

  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}

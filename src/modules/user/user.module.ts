import { Module } from '@nestjs/common';
import { FillProfileService } from 'src/modules/user/services/fillProfile.service';
import { RateService } from 'src/modules/user/services/rate.service';
import { ReviewService } from 'src/modules/user/services/review.service';
import { UserService } from 'src/modules/user/services/user.service';
import { UserController } from 'src/modules/user/user.controller';

@Module({
  imports: [],
  providers: [UserService, RateService, ReviewService, FillProfileService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}

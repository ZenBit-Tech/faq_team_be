import { Global, Module } from '@nestjs/common';

import { UserRepository } from 'src/modules//repository/services/user.repository';
import { FollowRepository } from 'src/modules/repository/services/followe.repository';
import { RateRepository } from 'src/modules/repository/services/rate.repository';
import { ReviewRepository } from 'src/modules/repository/services/review.repository';

const repositories = [
  UserRepository,
  RateRepository,
  ReviewRepository,
  FollowRepository,
];

@Global()
@Module({
  providers: repositories,
  exports: repositories,
})
export class RepositoryModule {}

import { Injectable } from '@nestjs/common';

import { ReviewEntity } from 'src/entities/review.entity';
import { ReviewRepository } from 'src/modules/repository/services/review.repository';
import { MakeReviewRequestDto } from 'src/modules/user/dto/make-review.request.dto';
import { UserService } from 'src/modules/user/services/user.service';

@Injectable()
export class ReviewService {
  constructor(
    private readonly userService: UserService,
    private readonly reviewRepository: ReviewRepository,
  ) {}

  public async getReviews(review_target: string): Promise<ReviewEntity[]> {
    await this.userService.isUserExist(review_target);

    return await this.reviewRepository.find({
      where: { reviewer_id: review_target },
    });
  }

  public async createReview(
    reviewer: string,
    dto: MakeReviewRequestDto,
  ): Promise<void> {
    await this.userService.isUserExist(dto.review_target_id);

    await this.reviewRepository.save(
      this.reviewRepository.create({
        review_text: dto.review_text,
        reviewer_id: reviewer,
        review_target_id: dto.review_target_id,
      }),
    );
  }

  public async deleteReview(id: string): Promise<void> {
    await this.reviewRepository.findOneBy({ id });

    await this.reviewRepository.delete({ id });
  }
}

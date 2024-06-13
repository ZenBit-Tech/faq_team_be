import { ForbiddenException, Injectable } from '@nestjs/common';
import { EErrorMessage } from 'src/common/enums/error-message.enum';
import { RateRepository } from 'src/modules/repository/services/rate.repository';
import { UserRepository } from 'src/modules/repository/services/user.repository';
import { RateRequestDto } from 'src/modules/user/dto/rate.request.dto';

@Injectable()
export class RateService {
  constructor(
    private readonly rateRepository: RateRepository,
    private readonly userRepository: UserRepository,
  ) {}

  public async rateUser(rater: string, dto: RateRequestDto): Promise<void> {
    const { rate, rate_target_id } = dto;

    await this.userRepository.findOneBy({ id: rate_target_id });

    const isRated = await this.rateRepository.findOneBy({
      rater,
      rate_target_id,
    });

    if (isRated) {
      throw new ForbiddenException(EErrorMessage.ALREADY_RATED);
    }

    await this.rateRepository.save(
      this.rateRepository.create({
        rater,
        rate_target_id,
        rate,
      }),
    );
  }
}

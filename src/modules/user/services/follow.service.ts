import { ConflictException, Injectable } from '@nestjs/common';

import { EErrorMessage } from 'src/common/enums/error-message.enum';
import { FollowRepository } from 'src/modules/repository/services/followe.repository';
import { UserService } from 'src/modules/user/services/user.service';

@Injectable()
export class FollowService {
  constructor(
    private readonly followRepository: FollowRepository,
    private readonly userService: UserService,
  ) {}

  public async follow(
    follower_id: string,
    follow_target_id: string,
  ): Promise<void> {
    if (follow_target_id === follower_id) {
      throw new ConflictException(EErrorMessage.FOLLOW_YOURSELF);
    }

    const entity = await this.userService.isUserExist(follow_target_id);
    const isFollow = await this.isFollowing(follower_id, entity.id);

    if (isFollow) {
      throw new ConflictException(EErrorMessage.ALREADY_FOLLOW);
    }

    await this.followRepository.save(
      this.followRepository.create({
        follower_id,
        following_id: entity.id,
      }),
    );
  }

  public async unfollow(
    follower_id: string,
    unfollow_target_id: string,
  ): Promise<void> {
    const entity = await this.userService.isUserExist(unfollow_target_id);

    const isFollow = await this.isFollowing(follower_id, entity.id);

    if (!isFollow) {
      throw new ConflictException(EErrorMessage.CANT_UNFOLLOW);
    }

    await this.followRepository.delete({
      follower_id,
      following_id: entity.id,
    });
  }

  public async isFollowing(
    follower_id: string,
    follow_target_id: string,
  ): Promise<boolean> {
    return !!(await this.followRepository.findOneBy({
      follower_id,
      following_id: follow_target_id,
    }));
  }
}

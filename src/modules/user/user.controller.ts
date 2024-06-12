import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ERouteName } from 'src/common/enums/route-name.enum';
import { ReviewEntity } from 'src/entities/review.entity';
import { UserEntity } from 'src/entities/user.entity';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwtAuthGuard';
import { DeleteReviewRequestDto } from 'src/modules/user/dto/delete-review.request.dto';
import { MakeReviewRequestDto } from 'src/modules/user/dto/make-review.request.dto';
import { RateRequestDto } from 'src/modules/user/dto/rate.request.dto';
import { UpdateUserDto } from 'src/modules/user/dto/update-user.dto';
import { RateService } from 'src/modules/user/services/rate.service';
import { ReviewService } from 'src/modules/user/services/review.service';
import { UserService } from 'src/modules/user/services/user.service';

@ApiTags('User')
@Controller(ERouteName.USERS_ROUTE)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly rateService: RateService,
    private readonly reviewService: ReviewService,
  ) {}

  @Get('/user/:id')
  async getUser(@Param('id', ParseUUIDPipe) id: string): Promise<UserEntity> {
    return await this.userService.getFullInfo(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Patch(ERouteName.USER_UPDATEBYID_ROUTE)
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<{ message: string }> {
    await this.userService.updateUser(updateUserDto, id);
    return { message: 'user updated successfully' };
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('rate/:id')
  async rateUser(@Req() { user }, @Body() dto: RateRequestDto): Promise<void> {
    return await this.rateService.rateUser(user.userId, dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post('/user/make-review')
  async makeReview(
    @Req() { user },
    @Body() dto: MakeReviewRequestDto,
  ): Promise<void> {
    return await this.reviewService.createReview(user.userId, dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get('/user/reviews')
  async getReviews(@Req() { user }): Promise<ReviewEntity[]> {
    return await this.reviewService.getReviews(user.userId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete('/user/reviews')
  async deleteReview(
    @Body() dto: DeleteReviewRequestDto,
  ): Promise<ReviewEntity[]> {
    return await this.reviewService.getReviews(dto.id);
  }
}

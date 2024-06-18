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
  Query,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PaymentMethod } from '@stripe/stripe-js';
import { ERouteName } from 'src/common/enums/route-name.enum';
import { ReviewEntity } from 'src/entities/review.entity';
import { UserEntity } from 'src/entities/user.entity';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwtAuthGuard';
import { MakeReviewRequestDto } from 'src/modules/user/dto/make-review.request.dto';
import { RateRequestDto } from 'src/modules/user/dto/rate-request.dto';
import { UpdateUserDto } from 'src/modules/user/dto/update-user.dto';
import { RateService } from 'src/modules/user/services/rate.service';
import { ReviewService } from 'src/modules/user/services/review.service';
import { UserService } from 'src/modules/user/services/user.service';

import { UsersFilterDto } from './dto/filter-users.dto';

@ApiTags('User')
@Controller(ERouteName.USERS_ROUTE)
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly rateService: RateService,
    private readonly reviewService: ReviewService,
  ) {}

  @Get(ERouteName.GET_USER)
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

  @Get(ERouteName.GET_USERS_ROUTE)
  @HttpCode(HttpStatus.OK)
  async getAll(
    @Query() query: UsersFilterDto,
  ): Promise<{ users: UserEntity[]; totalCount: number }> {
    return await this.userService.getAllUsers(query);
  }

  @Delete(ERouteName.DELETE_USER)
  @HttpCode(HttpStatus.OK)
  async deleteBySuperAdmin(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    return await this.userService.softDelete(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(ERouteName.RATE_USER)
  async rateUser(@Req() { user }, @Body() dto: RateRequestDto): Promise<void> {
    return await this.rateService.rateUser(user.userId, dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(ERouteName.MAKE_REVIEW)
  async makeReview(
    @Req() { user },
    @Body() dto: MakeReviewRequestDto,
  ): Promise<void> {
    return await this.reviewService.createReview(user.userId, dto);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Get(ERouteName.GET_REVIEWS)
  async getReviews(@Req() { user }): Promise<ReviewEntity[]> {
    return await this.reviewService.getReviews(user.userId);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Delete(ERouteName.DELETE_REVIEW)
  async deleteReview(@Param('id', ParseUUIDPipe) id: string): Promise<void> {
    return await this.reviewService.deleteReview(id);
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(ERouteName.SAVE_GENERAL_INFO)
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(FileInterceptor('file'))
  async saveGeneralInfo(
    @UploadedFile() file: Express.Multer.File,
    @Body('phone') phone: string,
    @Body('id') id: string,
  ) {
    return await this.userService.saveGeneralInfo({ file, phone, id });
  }

  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post(ERouteName.SAVE_CARD_INFO)
  async saveCardInfo(
    @Body()
    { paymentMethod, id }: { paymentMethod: PaymentMethod; id: string },
  ): Promise<void> {
    return await this.userService.saveCardInfo({ id, paymentMethod });
  }
}

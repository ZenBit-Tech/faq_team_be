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
  Query,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ERouteName } from 'src/common/enums/route-name.enum';
import { UserEntity } from 'src/entities/user.entity';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwtAuthGuard';
import { UpdateUserDto } from 'src/modules/user/dto/update-user.dto';
import { UserService } from 'src/modules/user/services/user.service';

import { UsersFilterDto } from './dto/filter-users.dto';

@ApiTags('User')
@Controller(ERouteName.USERS_ROUTE)
export class UserController {
  constructor(private readonly userService: UserService) {}
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

  @Get()
  @HttpCode(HttpStatus.OK)
  async getById(@Param('id', ParseUUIDPipe) id: string): Promise<UserEntity> {
    return await this.userService.getUser(id);
  }

  @Delete()
  @HttpCode(HttpStatus.OK)
  async deleteBySuperAdmin(
    @Param('id', ParseUUIDPipe) id: string,
  ): Promise<void> {
    return await this.userService.softDelete(id);
  }
}

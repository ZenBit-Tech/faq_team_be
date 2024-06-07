import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ERouteName } from 'src/common/enums/route-name.enum';

import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@ApiTags('User')
@Controller(ERouteName.USERS_ROUTE)
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Patch(ERouteName.USER_UPDATEBYID_ROUTE)
  @HttpCode(HttpStatus.OK)
  async update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<{ message: string }> {
    await this.userService.updateUser(updateUserDto, id);
    return { message: 'user updated successfully' };
  }
}

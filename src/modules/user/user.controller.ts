import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { ERouteName } from 'src/common/enums/route-name.enum';
import { JwtAuthGuard } from 'src/modules/auth/guards/jwtAuthGuard';
import { UpdateUserDto } from 'src/modules/user/dto/update-user.dto';
import { UserService } from 'src/modules/user/user.service';

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
}

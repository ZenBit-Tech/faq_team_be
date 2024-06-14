import { Module } from '@nestjs/common';
import { UserService } from 'src/modules/user/services/user.service';
import { UserSeederService } from 'src/modules/user/services/user-seed.service';
import { UserController } from 'src/modules/user/user.controller';

@Module({
  imports: [],
  providers: [UserService, UserSeederService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}

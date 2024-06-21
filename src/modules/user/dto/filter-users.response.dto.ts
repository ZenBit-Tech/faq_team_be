import { ApiProperty } from '@nestjs/swagger';

import { UserEntity } from 'src/entities/user.entity';

export class UsersFilterResponseDto {
  @ApiProperty()
  users: UserEntity[];
  @ApiProperty()
  totalCount: number;
}

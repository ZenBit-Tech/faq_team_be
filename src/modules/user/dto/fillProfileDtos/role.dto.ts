import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';
import { EUserRole } from 'src/common/enums/user-role.enum';

export class RoleDto {
  @IsString()
  @ApiProperty()
  id: string;

  @IsString()
  @ApiProperty()
  role: EUserRole;
}

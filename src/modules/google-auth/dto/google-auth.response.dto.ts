import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { EGoogLeAuthAction } from 'src/modules/google-auth/enums/google-auth-action.enum';

export class GoogleAuthResponseDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  authInfo: EGoogLeAuthAction;

  @ApiPropertyOptional()
  email?: string;

  @ApiPropertyOptional()
  full_name?: string;

  @ApiProperty()
  is_verified: boolean;
}

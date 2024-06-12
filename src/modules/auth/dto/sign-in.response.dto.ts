import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from 'src/modules/auth/dto/user.response.dto';

export class AuthReqDto {
  @ApiProperty()
  user: UserDto;
}

export class AccesResponseDto {
  @ApiProperty({
    description: 'The access token a user receives to the client',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL2V4YW1wbGUuYXV0aDAuY29tLyIsImF1ZCI6Imh0dHBzOi8vYXBpLmV4YW1wbGUuY29tL2NhbGFuZGFyL3YxLyIsInN1YiI6InVzcl8xMjMiLCJpYXQiOjE0NTg3ODU3OTYsImV4cCI6MTQ1ODg3MjE5Nn0.CA7eaHjIHz5NxeIJoFK9krqaeZrPLwmMmgI_XiQiIkQ',
  })
  access_token: string;

  @ApiProperty()
  is_verified: boolean;
}
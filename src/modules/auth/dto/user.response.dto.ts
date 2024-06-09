import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({
    description: 'The unique identifier of the user.',
    example: '8a6e0804-2bd0-4672-b79d-d97027f9071a',
  })
  id: string;

  @ApiProperty({
    description: 'The date of creation of the user.',
    example: '2023-06-04T12:00:00Z',
  })
  created_at: Date;

  @ApiProperty({
    description: 'The date of the last update of the user info.',
    example: '2023-06-04T12:00:00Z',
  })
  updated_at: Date;

  @ApiProperty({
    description: 'The name of the user.',
    example: 'John Doe',
  })
  full_name: string;

  @ApiProperty({
    description: 'The email address of the user.',
    example: 'john.doe@example.com',
  })
  email: string;

  @ApiProperty({
    description: 'The password for the user account.',
    example: '$3f$00$bfOlGlUdTopkI1aKJgfXEwRXhbss7spSgaktfTskP01IDAObl7Aiu',
  })
  password: string;

  @ApiProperty({
    description: 'Indicates if the user is verified.',
    example: false,
  })
  is_verified: boolean;

  @ApiProperty({
    description: 'The step of the profile completion.',
    example: 0,
  })
  filled_profile_step: number;

  @ApiProperty({
    description: 'The OTP code for user verification.',
    example: '123456',
  })
  otp_code: string;

  @ApiProperty({
    description: 'The status of the user.',
    example: 'active',
  })
  user_status: string;

  @ApiProperty({
    description: 'Indicates if the user is deleted by admin.',
    example: false,
  })
  is_deleted_by_admin: boolean;

  @ApiProperty({
    description: 'The role of the user.',
    example: 'admin',
  })
  user_role: string;

  @ApiProperty({
    description: 'The avatar of the user.',
    example: 'http://example.com/avatar.png',
  })
  avatar: string;

  @ApiProperty({
    description: 'The phone number of the user.',
    example: '123-456-7890',
  })
  phone: string;

  @ApiProperty({
    description: 'The primary address of the user.',
    example: '123 Main St',
  })
  address: string;

  @ApiProperty({
    description: 'The secondary address of the user.',
    example: 'Apt 4B',
  })
  address_2: string;

  @ApiProperty({
    description: 'The country of the user.',
    example: 'USA',
  })
  country: string;

  @ApiProperty({
    description: 'The city of the user.',
    example: 'New York',
  })
  city: string;

  @ApiProperty({
    description: 'The clothing size of the user.',
    example: 'M',
  })
  cloth_size: string;

  @ApiProperty({
    description: 'The jeans size of the user.',
    example: '32',
  })
  jeans_size: string;

  @ApiProperty({
    description: 'The shoe size of the user.',
    example: 10,
  })
  shoes_size: number;
}

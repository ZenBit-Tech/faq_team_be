import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class MakeReviewRequestDto {
  @ApiProperty()
  @IsString()
  review_target_id: string;

  @ApiProperty()
  @IsString()
  body: string;
}

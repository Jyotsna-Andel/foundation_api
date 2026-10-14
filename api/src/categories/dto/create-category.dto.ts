import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';
import { trim } from '../../common/transforms/trim.js';

//A class describing the shape of the input a category
export class CreateCategoryDto {
  @ApiProperty({ example: 'Science Fiction', maxLength: 60 })
  // " Fiction " becomes "Fiction", so whitespace can't create near-duplicate categories
  @Transform(trim)
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  name: string;
}

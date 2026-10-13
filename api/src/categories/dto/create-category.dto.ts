import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

//A class describing the shape of the input a category
export class CreateCategoryDto {
  @ApiProperty({ example: 'Science Fiction', maxLength: 60 })
  // " Fiction " becomes "Fiction", so whitespace can't create near-duplicate categories
  @Transform(({ value }) => (typeof value === 'string' ? value.trim() : value))
  @IsString()
  @IsNotEmpty()
  @MaxLength(60)
  name: string;
}

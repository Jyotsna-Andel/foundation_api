import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import {
  ArrayUnique,
  IsArray,
  IsInt,
  IsISBN,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  Max,
  MaxLength,
  Min,
} from 'class-validator';
import { trim } from '../../common/transforms/trim.js';

export class CreateBookDto {
  @ApiProperty({
    example: '9780441478125',
    description:
      'ISBN-10 or ISBN-13; hyphens and spaces are removed before saving',
  })
  @Transform(({ value }) =>
    typeof value === 'string' ? value.replace(/[\s-]/g, '') : value,
  )
  @IsISBN()
  isbn: string;

  @ApiProperty({ example: 'The Left Hand of Darkness', maxLength: 200 })
  @Transform(trim)
  @IsString()
  @IsNotEmpty()
  @MaxLength(200)
  title: string;

  @ApiPropertyOptional({ example: 1969, minimum: 1000 })
  @IsOptional()
  @IsInt()
  @Min(1000)
  @Max(new Date().getFullYear())
  publishedYear?: number;

  @ApiPropertyOptional({ example: 3, minimum: 1, maximum: 1000, default: 1 })
  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(1000)
  totalCopies?: number;

  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  categoryId: string;

  @ApiPropertyOptional({ type: [String], format: 'uuid' })
  @IsOptional()
  @IsArray()
  @ArrayUnique()
  @IsUUID('all', { each: true })
  authorIds?: string[];
}

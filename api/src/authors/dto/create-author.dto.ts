import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
import { trim } from '../../common/transforms/trim.js';

export class CreateAuthorDto {
  @ApiProperty({ example: 'Ursula K. Le Guin', maxLength: 120 })
  @Transform(trim)
  @IsString()
  @IsNotEmpty()
  @MaxLength(120)
  name: string;

  @ApiPropertyOptional({
    example: 'American author of science fiction and fantasy.',
    maxLength: 2000,
  })
  @Transform(trim)
  @IsOptional()
  @IsString()
  @MaxLength(2000)
  bio?: string;
}

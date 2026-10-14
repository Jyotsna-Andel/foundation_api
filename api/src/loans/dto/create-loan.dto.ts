import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDate, IsOptional, IsUUID } from 'class-validator';

export class CreateLoanDto {
  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  bookId: string;

  @ApiProperty({ format: 'uuid' })
  @IsUUID()
  memberId: string;

  @ApiPropertyOptional({
    type: String,
    format: 'date-time',
    example: '2026-11-01T00:00:00.000Z',
    description: 'Defaults to 14 days from now; must be in the future',
  })
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  dueAt?: Date;
}

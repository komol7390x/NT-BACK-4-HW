import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateBorrowDto {
  // ------------------ BORROW DATE ------------------
  @ApiProperty({
    description: 'The date when the item was borrowed',
    example: '2025-09-16',
    pattern: '^\\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$',
  })
  @IsString()
  borrow_date: string;

  // ------------------ DUE DATE ------------------
  @ApiProperty({
    description: 'The due date for returning the item',
    example: '2025-09-23',
  })
  @IsString()
  due_date: string;

  // ------------------ RETURN DATE ------------------
  @ApiProperty({
    description: 'The date when the item was returned',
    example: '2025-09-20',
    required: false,
  })
  @IsOptional()
  @IsString()
  return_date?: string;

  // ------------------ OVERDUE ------------------
  @ApiProperty({
    description: 'Indicates whether the item is overdue',
    example: false,
    default: false,
  })
  @IsOptional()
  @IsBoolean()
  overdue?: boolean;
}
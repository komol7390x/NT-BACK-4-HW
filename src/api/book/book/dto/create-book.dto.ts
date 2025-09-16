import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateBookDto {
  // ------------------ TITLE ------------------
  @ApiProperty({
    description: 'The title of the book',
    example: 'Clean Code',
  })
  @IsString()
  title: string;

  // ------------------ AUTHOR ------------------
  @ApiProperty({
    description: 'The author of the book',
    example: 'Robert C. Martin',
  })
  @IsString()
  author: string;

  // ------------------ PUBLISHED YEAR ------------------
  @ApiProperty({
    description: 'The year the book was published',
    example: '2008',
  })
  @IsString()
  published_year: string;

  // ------------------ AVAILABLE ------------------
  @ApiProperty({
    description: 'Indicates whether the book is available',
    example: true,
    default: false,
    required: false,
  })
  @IsOptional()
  @IsBoolean()
  avialable?: boolean;
}

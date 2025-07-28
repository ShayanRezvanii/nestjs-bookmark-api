import { IsOptional, IsString, IsUrl } from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateBookmarkDto {
  @ApiProperty({
    example: 'NestJS Guide',
    description: 'Title of the bookmark',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'https://docs.nestjs.com',
    description: 'URL of the bookmark',
  })
  @IsUrl()
  url: string;

  @ApiPropertyOptional({
    example: 'A comprehensive guide to NestJS framework.',
    description: 'Optional description of the bookmark',
  })
  @IsOptional()
  @IsString()
  description?: string;
}

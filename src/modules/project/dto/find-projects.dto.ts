import { Type } from 'class-transformer'
import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, Max, Min, IsOptional } from 'class-validator'

export class FindProjectDto {
  @ApiProperty({
    example: 1,
    description: 'Current table page',
  })
  @Type(() => Number)
  @IsNotEmpty({ message: 'The page field must not be empty.' })
  @Min(1, { message: 'The page number must be at least 1.' })
  page: number

  @ApiProperty({
    example: 10,
    description: 'The number of results per page',
  })
  @Type(() => Number)
  @IsNotEmpty({ message: 'The pageSize field must not be empty.' })
  @Max(20, { message: 'The maximum number of results per page is 20.' })
  pageSize: number

  @ApiProperty({
    example: 7,
    description: 'Filter for projects created in the last X days. Optional.',
    required: false,
  })
  @Type(() => Number)
  @IsOptional()
  @Min(1, { message: 'The filterByDays must be at least 1 if provided.' })
  filterByDays?: number
}

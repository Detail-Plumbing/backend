import { ApiProperty } from '@nestjs/swagger'
import { ProjectStatus } from '@prisma/client'
import { IsEnum, IsNotEmpty, IsOptional, MaxLength } from 'class-validator'

export class CreateProjectDto {
  @ApiProperty({
    example: 'My Project',
    description:
      'The name of the project. This field is required and should not exceed 80 characters.',
  })
  @IsNotEmpty({ message: 'The project name must not be empty.' })
  @MaxLength(80, { message: 'The project name must not exceed 80 characters.' })
  name: string

  @ApiProperty({
    example: 'A brief description of the project',
    description:
      'Details about the project. This field is optional but should not exceed 280 characters if provided.',
  })
  @MaxLength(280, { message: 'The project description must not exceed 280 characters.' })
  description: string

  @ApiProperty({
    example: 'A brief note of the project',
    description: 'This field is optional but should not exceed 280 characters if provided.',
  })
  @MaxLength(280, { message: 'The project note must not exceed 280 characters.' })
  note: string

  @ApiProperty({
    example: '123 Main Street, City, Country',
    description:
      'The physical address associated with the project. This field is required and should not exceed 80 characters.',
  })
  @IsNotEmpty({ message: 'The project address must not be empty.' })
  @MaxLength(80, { message: 'The project address must not exceed 80 characters.' })
  address: string

  @ApiProperty({
    example: '2024-12-25',
    description:
      'The expected shipping date for the project. This field is required and should follow the format YYYY-MM-DD.',
  })
  @IsOptional()
  shippingDate?: string

  @ApiProperty({
    example: ProjectStatus.PROGRESS,
    description:
      'The current status of the project. Must be one of the following values: WON, LOST, or PROGRESS.',
    enum: ProjectStatus,
    required: false,
  })
  @IsEnum(ProjectStatus, {
    message: 'Status must be either: WON | LOST | HOLD | NOT_SET | PENDING | PROGRESS',
  })
  status?: ProjectStatus
}

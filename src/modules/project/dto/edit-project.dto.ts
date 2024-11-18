import { ApiProperty } from '@nestjs/swagger'
import { ProjectStatus } from '@prisma/client'
import { IsEnum, MaxLength } from 'class-validator'

export class EditProjectDto {
  @ApiProperty({
    example: 'New name',
    description: 'The new project name',
    required: false,
  })
  @MaxLength(80, { message: 'The project name must not exceed 80 characters.' })
  name?: string

  @ApiProperty({
    example: 'My new description',
    description: 'The new project description',
    required: false,
  })
  @MaxLength(280, { message: 'The project description must not exceed 280 characters.' })
  description?: string

  @ApiProperty({
    example: 'A brief note of the project',
    description: 'This field is optional but should not exceed 280 characters if provided.',
    required: false,
  })
  @MaxLength(280, { message: 'The project note must not exceed 280 characters.' })
  note?: string

  @ApiProperty({
    example: '123 Main Street, City, Country',
    description:
      'The physical address associated with the project. This field is optional and should not exceed 80 characters if provided.',
    required: false,
  })
  @MaxLength(80, { message: 'The project address must not exceed 80 characters.' })
  address?: string

  @ApiProperty({
    example: '2024-12-25',
    description: 'The expected shipping date for the project. This field is optional.',
    required: false,
  })
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

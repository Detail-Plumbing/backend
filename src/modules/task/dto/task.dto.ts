import { ApiProperty } from '@nestjs/swagger'
import { TaskItemStatus } from '@prisma/client'
import { IsEnum, IsNotEmpty } from 'class-validator'

export class TaskDto {
  @ApiProperty({
    example: 'My Project',
    description: 'The name of the task category.',
  })
  @IsNotEmpty({ message: 'Name must not be empty' })
  name: string

  @ApiProperty({
    example: 'My Project',
    description: 'The name of the task category.',
  })
  @IsEnum(TaskItemStatus, {
    message: 'Status must be either: COMPLETE | PENDING | PROGRESS',
  })
  @IsNotEmpty({ message: 'Name must not be empty' })
  status: TaskItemStatus

  @ApiProperty({
    example: 1,
    description: 'Owner id',
  })
  @IsNotEmpty({ message: 'Owner id must not be empty' })
  ownerId: number

  @ApiProperty({
    example: '26/12/2024',
    description: 'end date',
  })
  @IsNotEmpty({ message: 'End date must not be empty' })
  endDate: string

  @ApiProperty({
    example: '26/12/2005',
    description: 'start date',
  })
  @IsNotEmpty({ message: 'start date must not be empty' })
  startDate: string

  @ApiProperty({
    example: 1,
    description: 'Task table id',
  })
  @IsNotEmpty({ message: 'Task table id must not be empty' })
  taskTableId: number
}

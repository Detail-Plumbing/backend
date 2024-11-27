import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class TaskTableDto {
  @ApiProperty({
    example: 'My Project',
    description: 'The name of the task table.',
  })
  @IsNotEmpty({ message: 'Name must not be empty' })
  name: string

  @ApiProperty({
    example: 'My Project',
    description: 'The color of the task table.',
  })
  @IsNotEmpty({ message: 'Color must not be empty' })
  color: string

  @ApiProperty({
    example: 'My Project',
    description: 'The name of the task category.',
  })
  @IsNotEmpty({ message: 'Name must not be empty' })
  taskCategoryId: number
}

export class UpdateTaskTableDto {
  @ApiProperty({
    example: 'My Project',
    description: 'The new name of the task table.',
  })
  @IsNotEmpty({ message: 'New name must not be empty' })
  name: string

  @ApiProperty({
    example: 'Edited',
    description: 'The new color of the task table.',
  })
  @IsNotEmpty({ message: 'New color must not be empty' })
  color: string
}

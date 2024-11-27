import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty } from 'class-validator'

export class TaskCategoryDto {
  @ApiProperty({
    example: 'My Project',
    description: 'The name of the task category.',
  })
  @IsNotEmpty({ message: 'Name must not be empty' })
  name: string
}

import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, MaxLength } from 'class-validator'

export class EditProjectDto {
  @ApiProperty({
    example: 'New name',
    description: 'The new project name',
  })
  @IsNotEmpty({ message: 'The project name must not be empty.' })
  @MaxLength(80, { message: 'The maximum number of characters is 80' })
  name: string

  @ApiProperty({
    example: 'My new description',
    description: 'The new project description',
  })
  @MaxLength(80, { message: 'The maximum number of characters is 280' })
  description: string
}

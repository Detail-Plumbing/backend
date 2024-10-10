import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, MaxLength } from 'class-validator'

export class CreateProjectDto {
  @ApiProperty({
    example: 'My project',
    description: 'The project name',
  })
  @IsNotEmpty({ message: 'The project name must not be empty.' })
  @MaxLength(80, { message: 'The maximum number of characters is 80' })
  name: string

  @ApiProperty({
    example: 'My description',
    description: 'The project description',
  })
  @MaxLength(80, { message: 'The maximum number of characters is 280' })
  description: string
}

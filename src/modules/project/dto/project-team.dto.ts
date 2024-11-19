import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber } from 'class-validator'

export class ProjectTeamDto {
  @ApiProperty({
    example: 1,
    description: 'The ID of the project.',
  })
  @IsNotEmpty({ message: 'Project ID must not be empty.' })
  @IsNumber({}, { message: 'Project ID must be a number.' })
  projectId: number

  @ApiProperty({
    example: 1,
    description: 'The ID of the user.',
  })
  @IsNotEmpty({ message: 'User ID must not be empty.' })
  @IsNumber({}, { message: 'User ID must be a number.' })
  userId: number
}

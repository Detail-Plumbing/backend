import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber } from 'class-validator'

export class ToolUserDto {
  @ApiProperty({
    example: 1,
    description: 'The ID of the tool.',
  })
  @IsNotEmpty({ message: 'Tool ID must not be empty.' })
  @IsNumber({}, { message: 'Tool ID must be a number.' })
  toolId: number

  @ApiProperty({
    example: 1,
    description: 'The ID of the user.',
  })
  @IsNotEmpty({ message: 'User ID must not be empty.' })
  @IsNumber({}, { message: 'User ID must be a number.' })
  userId: number
}

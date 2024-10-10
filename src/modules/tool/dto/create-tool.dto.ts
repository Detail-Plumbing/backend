import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsNumber, MaxLength } from 'class-validator'

export class CreateToolDto {
  @ApiProperty({
    example: 'My Tool',
    description:
      'The name of the tool to be created. This should be a descriptive title that identifies the tool clearly.',
    maxLength: 80,
  })
  @IsNotEmpty({ message: 'The tool name must not be empty.' })
  @MaxLength(80, { message: 'The maximum number of characters is 80' })
  name: string

  @ApiProperty({
    example: 1,
    description:
      'The ID of the inventory to which this tool belongs. This must be a valid existing inventory ID.',
  })
  @IsNotEmpty({ message: 'The inventory id must not be empty.' })
  @IsNumber({}, { message: 'The inventory id must be a number.' })
  inventoryId: number
}

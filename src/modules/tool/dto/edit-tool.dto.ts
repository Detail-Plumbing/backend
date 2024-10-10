import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, MaxLength } from 'class-validator'

export class EditToolDto {
  @ApiProperty({
    example: 'Updated Tool Name',
    description:
      'The new name for the tool. This should be a descriptive title that identifies the tool clearly.',
  })
  @IsNotEmpty({ message: 'The tool name must not be empty.' })
  @MaxLength(80, { message: 'The maximum number of characters is 80' })
  name: string
}

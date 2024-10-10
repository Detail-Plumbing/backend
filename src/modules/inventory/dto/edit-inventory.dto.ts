import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, MaxLength } from 'class-validator'

export class EditInventoryDto {
  @ApiProperty({
    example: 'New name',
    description: 'The new inventory name',
  })
  @IsNotEmpty({ message: 'The inventory name must not be empty.' })
  @MaxLength(80, { message: 'The maximum number of characters is 80' })
  name: string

  @ApiProperty({
    example: 'My new description',
    description: 'The new inventory description',
  })
  @MaxLength(80, { message: 'The maximum number of characters is 280' })
  description: string
}

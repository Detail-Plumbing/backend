import { ApiProperty } from '@nestjs/swagger'
import { IsNotEmpty, IsString, MinLength } from 'class-validator'

export class SearchUserDto {
  @ApiProperty({
    description: 'Name to search',
    example: 'Arviixzuh',
  })
  @MinLength(3)
  @IsNotEmpty({ message: 'The interval must not be empty.' })
  @IsString()
  name: string
}

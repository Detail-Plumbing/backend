import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsUrl } from 'class-validator'

export class EditUserDto {
  @ApiProperty({
    description: 'The new first name of the user',
    example: 'Victor',
  })
  @IsString()
  name: string

  @ApiProperty({
    description: 'The new last name of the user',
    example: 'Pandolfi',
  })
  @IsString()
  lastName: string

  @ApiProperty({
    description: 'The new avatar URL for the user',
    example: 'https://example.com/avatar.jpg',
  })
  @IsUrl()
  @IsString()
  avatar: string
}

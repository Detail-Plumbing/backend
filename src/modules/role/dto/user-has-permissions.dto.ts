import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsInt, IsNotEmpty } from 'class-validator'

export class UserHasPermissions {
  @ApiProperty({
    description: 'ID of the user to check permissions for',
    example: 1,
  })
  @IsInt()
  userId: number

  @ApiProperty({
    description: 'The name of the permission to check',
    example: 'CREATE_USER',
  })
  @IsString()
  @IsNotEmpty()
  permissionName: string
}

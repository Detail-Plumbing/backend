import { ApiProperty } from '@nestjs/swagger'
import { IsString, IsEnum, IsNotEmpty } from 'class-validator'

export class GetWorkTimeDto {
  @ApiProperty({
    description: 'Interval to filter work time data (today, week, month, year)',
    enum: ['today', 'week', 'month', 'year'],
    example: 'today',
  })
  @IsNotEmpty({ message: 'The interval must not be empty.' })
  @IsString()
  @IsEnum(['today', 'week', 'month', 'year'], {
    message: 'The interval must be today, week, month, or year',
  })
  interval: 'today' | 'week' | 'month' | 'year'
}

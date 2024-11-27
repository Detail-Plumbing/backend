import { Request } from 'express'
import { GetWorkTimeDto } from './dto/get-work-time.dto'
import { PermissionGuard } from 'src/guards/permission.guard'
import { TrackingTimeService } from './trackingtime.service'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Controller, Get, Post, Req, UseGuards, Query, Param } from '@nestjs/common'

@ApiTags('tracking-time')
@Controller('/tracking-time')
@ApiBearerAuth()
@UseGuards(PermissionGuard)
export class TrackingTimeController {
  constructor(private readonly trackingTimeService: TrackingTimeService) {}

  @Post('/start-day')
  startWorkday(@Req() req: Request) {
    return this.trackingTimeService.startWorkDay(req.user.userId)
  }

  @Get('/get-all-users-work-time')
  getUserWorkTime(@Query() query: GetWorkTimeDto) {
    return this.trackingTimeService.getUsersWorkTime(query.interval)
  }

  @Get('/get-my-work-time')
  getMyWorkTime(@Req() req: Request, @Query() query: GetWorkTimeDto) {
    return this.trackingTimeService.getMyWorkTime(req.user.userId, query.interval)
  }

  @Get('/get-work-time-per-week-by-user-id/:userId')
  getWorkTimePerWeekByUserId(@Param('userId') userId: number) {
    return this.trackingTimeService.getWorkTimePerWeekByUserId(userId)
  }
}

import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/prisma/prisma.module'
import { TrackingTimeService } from './trackingtime.service'
import { TrackingTimeController } from './trackingtime.controller'

@Module({
  imports: [PrismaModule],
  providers: [TrackingTimeService],
  controllers: [TrackingTimeController],
})
export class TrackingTimeModule {}

import { Module } from '@nestjs/common'
import { TaskService } from './task.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { TaskController } from './task.controller'

@Module({
  controllers: [TaskController],
  providers: [TaskService, PrismaService],
  exports: [TaskService],
})
export class TaskModule {}

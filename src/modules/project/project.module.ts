import { Module } from '@nestjs/common'
import { UserModule } from '../user/user.module'
import { PrismaModule } from 'src/prisma/prisma.module'
import { ProjectService } from './project.service'
import { ProjectController } from './project.controller'

@Module({
  imports: [PrismaModule, UserModule],
  providers: [ProjectService],
  controllers: [ProjectController],
})
export class ProjectModule {}

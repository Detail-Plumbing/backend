import { Module } from '@nestjs/common'
import { RoleService } from './role.service'
import { PrismaModule } from 'src/prisma/prisma.module'
import { RoleController } from './role.controller'

@Module({
  imports: [PrismaModule],
  providers: [RoleService],
  controllers: [RoleController],
})
export class RoleModule {}

import { Module } from '@nestjs/common'
import { UserModule } from '../user/user.module'
import { ToolService } from './tool.service'
import { PrismaModule } from 'src/prisma/prisma.module'
import { ToolController } from './tool.controller'
import { InventoryModule } from '../inventory/inventory.module'

@Module({
  imports: [PrismaModule, InventoryModule, UserModule],
  providers: [ToolService],
  controllers: [ToolController],
})
export class ToolModule {}

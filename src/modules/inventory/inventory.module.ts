import { Module } from '@nestjs/common'
import { PrismaModule } from 'src/prisma/prisma.module'
import { InventoryService } from './inventory.service'
import { InventoryController } from './inventory.controller'

@Module({
  imports: [PrismaModule],
  exports: [InventoryService],
  providers: [InventoryService],
  controllers: [InventoryController],
})
export class InventoryModule {}

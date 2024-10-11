import { PermissionGuard } from 'src/guards/permission.guard'
import { EditInventoryDto } from './dto/edit-inventory.dto'
import { InventoryService } from './inventory.service'
import { Permissions, perm } from 'src/decoratos/permissions.decorator'
import { CreateInventoryDto } from './dto/create-inventory.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common'

@ApiTags('inventory')
@Controller('/inventory')
@ApiBearerAuth()
@UseGuards(PermissionGuard)
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @Post('/create')
  @Permissions(perm.inventory.create)
  async createInventory(@Body() body: CreateInventoryDto) {
    return this.inventoryService.createInventory(body)
  }

  @Put('/edit/:id')
  @Permissions(perm.inventory.edit)
  async editInventory(@Body() body: EditInventoryDto, @Param('id') id: number) {
    return this.inventoryService.editInventory(id, body)
  }

  @Delete('/delete/:id')
  @Permissions(perm.inventory.delete)
  async deleteInventory(@Param('id') id: number) {
    return this.inventoryService.deleteInventory(id)
  }

  @Get('/find-by-id/:id')
  async findInventoryById(@Param('id') id: number) {
    return this.inventoryService.findInventoryById(id)
  }

  @Get('/find-all')
  async findAllInventorys() {
    return this.inventoryService.findAllInventories()
  }
}

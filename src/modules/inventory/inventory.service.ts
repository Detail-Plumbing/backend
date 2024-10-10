import { PrismaService } from 'src/prisma/prisma.service'
import { EditInventoryDto } from './dto/edit-inventory.dto'
import { CreateInventoryDto } from './dto/create-inventory.dto'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  async findInventoryById(id: number) {
    const inventory = await this.prisma.inventory.findUnique({ where: { id } })
    if (!inventory) throw new NotFoundException('Inventory not found.')
    return inventory
  }

  async createInventory(body: CreateInventoryDto) {
    return await this.prisma.inventory.create({
      data: {
        name: body.name,
        description: body.description,
      },
    })
  }

  async editInventory(id: number, data: EditInventoryDto) {
    await this.findInventoryById(id)
    return await this.prisma.inventory.update({
      where: { id },
      data,
    })
  }

  async deleteInventory(id: number) {
    await this.findInventoryById(id)
    return await this.prisma.inventory.delete({ where: { id } })
  }

  async findAllInventories() {
    return await this.prisma.inventory.findMany()
  }
}

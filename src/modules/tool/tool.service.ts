import { EditToolDto } from './dto/edit-tool.dto'
import { UserService } from '../user/user.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { InventoryService } from '../inventory/inventory.service'
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class ToolService {
  constructor(
    private prisma: PrismaService,
    private userService: UserService,
    private inventoryService: InventoryService,
  ) {}

  async findToolById(id: number) {
    const tool = await this.prisma.tool.findUnique({ where: { id } })
    if (!tool) throw new NotFoundException('Tool not found.')
    return tool
  }

  async createTool(name: string, inventoryId: number) {
    await this.inventoryService.findInventoryById(inventoryId)
    return this.prisma.tool.create({
      data: {
        name,
        inventoryId,
      },
    })
  }

  async editTool(id: number, data: EditToolDto) {
    await this.findToolById(id)
    return this.prisma.tool.update({
      where: { id },
      data,
    })
  }

  async deleteTool(id: number) {
    await this.findToolById(id)
    return this.prisma.tool.delete({ where: { id } })
  }

  async findToolsByInventoryId(inventoryId: number) {
    await this.inventoryService.findInventoryById(inventoryId)
    return this.prisma.tool.findMany({
      where: {
        inventoryId,
      },
    })
  }

  async findToolsByUserId(userId: number) {
    await this.userService.findUserById(userId)

    const tools = await this.prisma.tool.findMany({
      where: {
        toolUser: {
          some: {
            userId,
          },
        },
      },
      select: {
        id: true,
        name: true,
        inventoryId: true,
      },
    })

    if (tools.length === 0) throw new NotFoundException('No tools assigned to this user.')

    return tools
  }

  async assignToolToUser(toolId: number, userId: number) {
    await this.validateToolAndUser(toolId, userId)

    const isAssigned = await this.isToolAssigned(toolId, userId)
    if (isAssigned) {
      throw new BadRequestException('The tool is already assigned to the user.')
    }

    return this.prisma.toolUser.create({
      data: {
        userId,
        toolId,
      },
    })
  }

  async removeToolFromUser(toolId: number, userId: number) {
    await this.validateToolAndUser(toolId, userId)

    const isAssigned = await this.isToolAssigned(toolId, userId)
    if (!isAssigned) {
      throw new BadRequestException('The tool is not assigned to the user.')
    }

    return this.prisma.toolUser.deleteMany({
      where: {
        userId,
        toolId,
      },
    })
  }

  async findAllTools() {
    return this.prisma.tool.findMany()
  }

  private async isToolAssigned(toolId: number, userId: number) {
    const assignment = await this.prisma.toolUser.findFirst({
      where: {
        toolId,
        userId,
      },
    })

    return !!assignment
  }

  private async validateToolAndUser(toolId: number, userId: number) {
    await Promise.all([this.findToolById(toolId), this.userService.findUserById(userId)])
  }
}

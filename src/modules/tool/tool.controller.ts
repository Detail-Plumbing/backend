import { EditToolDto } from './dto/edit-tool.dto'
import { ToolUserDto } from './dto/tool-user.dto'
import { ToolService } from './tool.service'
import { ApiBearerAuth } from '@nestjs/swagger'
import { CreateToolDto } from './dto/create-tool.dto'
import { PermissionGuard } from 'src/guards/permission.guard'
import { Permissions, perm } from 'src/decoratos/permissions.decorator'
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common'

@Controller('/tool')
@ApiBearerAuth()
@UseGuards(PermissionGuard)
export class ToolController {
  constructor(private readonly toolService: ToolService) {}

  @Post('/create')
  @Permissions(perm.tool.create)
  async createTool(@Body() body: CreateToolDto) {
    return this.toolService.createTool(body.name, body.inventoryId)
  }

  @Put('/edit/:id')
  @Permissions(perm.tool.edit)
  async editTool(@Body() body: EditToolDto, @Param('id') id: number) {
    return this.toolService.editTool(id, body)
  }

  @Delete('/delete/:id')
  @Permissions(perm.tool.delete)
  async deleteTool(@Param('id') id: number) {
    return this.toolService.deleteTool(id)
  }

  @Get('/find-by-inventory-id/:id')
  async findToolsByInventoryId(@Param('id') id: number) {
    return this.toolService.findToolsByInventoryId(id)
  }

  @Get('/find-by-user-id/:id')
  async findToolsByUserId(@Param('id') id: number) {
    return this.toolService.findToolsByUserId(id)
  }

  @Get('/find-by-id/:id')
  async findToolById(@Param('id') id: number) {
    return this.toolService.findToolById(id)
  }

  @Post('/assign-user')
  async assignToolToUser(@Body() body: ToolUserDto) {
    return await this.toolService.assignToolToUser(body.toolId, body.userId)
  }

  @Delete('/remove-user')
  async removeToolFromUser(@Body() body: ToolUserDto) {
    return await this.toolService.removeToolFromUser(body.toolId, body.userId)
  }

  @Get('/find-all')
  async findAllTools() {
    return this.toolService.findAllTools()
  }
}

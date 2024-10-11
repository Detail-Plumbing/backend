import { EditToolDto } from './dto/edit-tool.dto'
import { ToolUserDto } from './dto/tool-user.dto'
import { ToolService } from './tool.service'
import { CreateToolDto } from './dto/create-tool.dto'
import { PermissionGuard } from 'src/guards/permission.guard'
import { Permissions, perm } from 'src/decoratos/permissions.decorator'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common'

@ApiTags('tool')
@Controller('/tool')
@ApiBearerAuth()
@UseGuards(PermissionGuard)
export class ToolController {
  constructor(private readonly toolService: ToolService) {}

  @Post('/create')
  @Permissions(perm.tool.create)
  createTool(@Body() body: CreateToolDto) {
    return this.toolService.createTool(body.name, body.inventoryId)
  }

  @Put('/edit/:id')
  @Permissions(perm.tool.edit)
  editTool(@Body() body: EditToolDto, @Param('id') id: number) {
    return this.toolService.editTool(id, body)
  }

  @Delete('/delete/:id')
  @Permissions(perm.tool.delete)
  deleteTool(@Param('id') id: number) {
    return this.toolService.deleteTool(id)
  }

  @Get('/find-by-inventory-id/:id')
  findToolsByInventoryId(@Param('id') id: number) {
    return this.toolService.findToolsByInventoryId(id)
  }

  @Get('/find-by-user-id/:id')
  findToolsByUserId(@Param('id') id: number) {
    return this.toolService.findToolsByUserId(id)
  }

  @Get('/find-by-id/:id')
  findToolById(@Param('id') id: number) {
    return this.toolService.findToolById(id)
  }

  @Post('/assign-user')
  assignToolToUser(@Body() body: ToolUserDto) {
    return this.toolService.assignToolToUser(body.toolId, body.userId)
  }

  @Delete('/remove-user')
  async removeToolFromUser(@Body() body: ToolUserDto) {
    return this.toolService.removeToolFromUser(body.toolId, body.userId)
  }

  @Get('/find-all')
  async findAllTools() {
    return this.toolService.findAllTools()
  }
}

import { EditProjectDto } from './dto/edit-project.dto'
import { ProjectService } from './project.service'
import { PermissionGuard } from 'src/guards/permission.guard'
import { CreateProjectDto } from './dto/create-project.dto'
import { Permissions, perm } from 'src/decoratos/permissions.decorator'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common'

@ApiTags('project')
@Controller('/project')
@ApiBearerAuth()
@UseGuards(PermissionGuard)
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('/create')
  @Permissions(perm.projects.create)
  createProject(@Body() body: CreateProjectDto) {
    return this.projectService.createProject(body)
  }

  @Put('/edit/:id')
  @Permissions(perm.projects.edit)
  editProject(@Body() body: EditProjectDto, @Param('id') id: number) {
    return this.projectService.editProject(id, body)
  }

  @Delete('/delete/:id')
  @Permissions(perm.projects.delete)
  deleteProject(@Param('id') id: number) {
    return this.projectService.deleteProject(id)
  }

  @Get('/find-by-id/:id')
  findProjectById(@Param('id') id: number) {
    return this.projectService.findProjectById(id)
  }

  @Get('/find-all')
  findAllProjects() {
    return this.projectService.findAllProjects()
  }
}

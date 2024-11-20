import { ProjectTeamDto } from './dto/project-team.dto'
import { FindProjectDto } from './dto/find-projects.dto'
import { EditProjectDto } from './dto/edit-project.dto'
import { ProjectService } from './project.service'
import { PermissionGuard } from 'src/guards/permission.guard'
import { CreateProjectDto } from './dto/create-project.dto'
import { Permissions, perm } from 'src/decoratos/permissions.decorator'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common'

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

  @Post('/assign-user')
  assignProjectToUser(@Body() body: ProjectTeamDto) {
    return this.projectService.assignProjectToUser(body.projectId, body.userId)
  }

  @Delete('/remove-user')
  async removeProjectTeam(@Body() body: ProjectTeamDto) {
    return this.projectService.removeProjectTeam(body.projectId, body.userId)
  }

  @Get('/get-projects-by-page')
  getProjectsByPage(@Query() query: FindProjectDto) {
    return this.projectService.getProjectsByPage(query.page, query.pageSize, query.filterByDays)
  }

  @Get('/find-all-users-from-project/:id')
  findAllUsersFromProject(@Param('id') id: number) {
    return this.projectService.findUsersFromProject(id)
  }
}

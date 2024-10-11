import { RoleService } from './role.service'
import { EditRoleDto } from './dto/edit-role.dto'
import { CreateRoleDto } from './dto/create-role.dto'
import { PermissionGuard } from 'src/guards/permission.guard'
import { Permissions, perm } from 'src/decoratos/permissions.decorator'
import { UserHasPermissions } from './dto/user-has-permissions.dto'
import { AssignRoleToUserDto } from './dto/assing-role-to-user.dto'
import { RemoveRoleToUserDto } from './dto/remove-role-user.dto'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { AddPermissionToRoleDto } from './dto/add-permission-to-role.dto'
import { RemovePermissionFromRoleDto } from './dto/remove-permission-from-role.dto'
import { Controller, Post, Put, Delete, Body, Param, Get, UseGuards } from '@nestjs/common'

@ApiTags('role')
@Controller('/role')
@ApiBearerAuth()
@UseGuards(PermissionGuard)
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post('/create')
  @Permissions(perm.roles.create)
  async createRole(@Body() createRoleDto: CreateRoleDto) {
    return this.roleService.createRole(createRoleDto.name)
  }

  @Delete('/delete/:id')
  @Permissions(perm.roles.delete)
  async deleteRole(@Param('id') id: number) {
    return this.roleService.deleteRole(id)
  }

  @Get('/load-all')
  async loadAllRoles() {
    return this.roleService.loadAllRoles()
  }

  @Get('/find-by-id/:id')
  async findRoleById(@Param('id') roleId: number) {
    return this.roleService.findRoleById(roleId)
  }

  @Put('/edit/:id')
  @Permissions(perm.roles.edit)
  async editRole(@Param('id') id: number, @Body() body: EditRoleDto) {
    return this.roleService.editRole(id, body.name)
  }

  @Post('/assign-user')
  @Permissions(perm.roles.assingUser)
  async assignRoleToUser(@Body() body: AssignRoleToUserDto) {
    return this.roleService.assignRoleToUser(body.userId, body.roleId)
  }

  @Delete('/remove-user')
  @Permissions(perm.roles.removeUser)
  async removeRoleToUser(@Body() body: RemoveRoleToUserDto) {
    return this.roleService.removeRoleFromUser(body.roleId, body.userId)
  }

  @Post('/add-permission')
  @Permissions(perm.roles.addPerm)
  async addPermissionToRole(@Body() body: AddPermissionToRoleDto) {
    return this.roleService.addPermissionToRole(body.roleId, body.name)
  }

  @Delete('/remove-permission')
  @Permissions(perm.roles.removePerm)
  async removePermissionFromRole(@Body() body: RemovePermissionFromRoleDto) {
    return this.roleService.removePermissionFromRole(body.roleId, body.permissionName)
  }

  @Post('/user/has-permission')
  async userHasPermission(@Body() body: UserHasPermissions) {
    return this.roleService.userHasPermission(body.userId, body.permissionName)
  }
}

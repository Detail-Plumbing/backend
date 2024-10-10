import { PrismaService } from 'src/prisma/prisma.service'
import { Injectable, HttpException, HttpStatus, NotFoundException } from '@nestjs/common'

@Injectable()
export class RoleService {
  constructor(private prisma: PrismaService) {}

  async findRoleById(roleId: number) {
    const role = await this.prisma.role.findUnique({ where: { id: roleId } })
    if (!role) throw new NotFoundException('Role not found.')
    return role
  }

  async createRole(name: string) {
    try {
      return await this.prisma.role.create({
        data: { name },
      })
    } catch (error) {
      throw new HttpException('An error occurred.', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }

  async deleteRole(id: number) {
    await this.findRoleById(id)
    return await this.prisma.role.delete({
      where: { id },
    })
  }

  async loadAllRoles() {
    return this.prisma.role.findMany({
      include: {
        users: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                avatar: true,
                lastName: true,
              },
            },
          },
        },
        permissions: true,
      },
    })
  }

  async editRole(id: number, name: string) {
    await this.findRoleById(id)

    return this.prisma.role.update({
      where: { id },
      data: { name },
    })
  }

  async assignRoleToUser(userId: number, roleId: number) {
    await this.findRoleById(roleId)

    const hasRole = await this.userHasRole(userId, roleId)
    if (hasRole)
      throw new HttpException('User already has this role assigned.', HttpStatus.CONFLICT)

    return await this.prisma.roleUser.create({
      data: {
        userId,
        roleId,
      },
    })
  }

  async removeRoleFromUser(roleId: number, userId: number) {
    const hasRole = await this.userHasRole(userId, roleId)
    if (!hasRole) throw new NotFoundException('User does not have this role assigned.')

    return await this.prisma.roleUser.deleteMany({
      where: {
        userId,
        roleId,
      },
    })
  }

  async addPermissionToRole(roleId: number, name: string) {
    const roleHasPermission = await this.findRoleByIdAndPermissionName(roleId, name)
    if (roleHasPermission)
      throw new HttpException('Role already has this permission assigned.', HttpStatus.CONFLICT)

    return this.prisma.rolePermission.create({
      data: {
        name,
        roleId,
      },
    })
  }

  async removePermissionFromRole(roleId: number, name: string) {
    const roleHasPermission = await this.findRoleByIdAndPermissionName(roleId, name)
    if (!roleHasPermission)
      throw new HttpException('Role does not have this permission assigned.', HttpStatus.CONFLICT)

    return this.prisma.rolePermission.deleteMany({
      where: {
        name,
        roleId,
      },
    })
  }

  async userHasPermission(userId: number, permissionName: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
        roles: {
          some: {
            role: {
              permissions: {
                some: {
                  OR: [{ name: '*' }, { name: permissionName }],
                },
              },
            },
          },
        },
      },
    })

    return { hasPermissions: !!user }
  }

  private async userHasRole(userId: number, roleId: number) {
    return await this.prisma.roleUser.findFirst({
      where: {
        userId,
        roleId,
      },
    })
  }

  private async findRoleByIdAndPermissionName(roleId: number, name: string) {
    await this.findRoleById(roleId)
    return await this.prisma.rolePermission.findFirst({
      where: {
        name,
        roleId,
      },
    })
  }
}

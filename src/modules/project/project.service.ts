import { UserService } from '../user/user.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { EditProjectDto } from './dto/edit-project.dto'
import { CreateProjectDto } from './dto/create-project.dto'
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class ProjectService {
  constructor(
    private userService: UserService,
    private prisma: PrismaService,
  ) {}

  async findProjectById(id: number) {
    const project = await this.prisma.project.findUnique({ where: { id } })
    if (!project) throw new NotFoundException('Project not found.')
    return project
  }

  async createProject(body: CreateProjectDto) {
    return await this.prisma.project.create({
      data: {
        name: body.name,
        note: body.note,
        status: body.status,
        address: body.address,
        description: body.description,
        shippingDate: body.shippingDate,
      },
    })
  }

  async editProject(id: number, data: EditProjectDto) {
    await this.findProjectById(id)
    return await this.prisma.project.update({
      where: { id },
      data,
    })
  }

  async deleteProject(id: number) {
    await this.findProjectById(id)
    return await this.prisma.project.delete({ where: { id } })
  }

  async getProjectsByPage(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize

    const projects = await this.prisma.project.findMany({
      skip,
      take: pageSize,
      include: {
        projectTeam: {
          include: {
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
      },
    })

    return projects.map((project) => ({
      ...project,
      projectTeam: project.projectTeam.map((item) => item.user),
    }))
  }

  async assignProjectToUser(projectId: number, userId: number) {
    await this.validateProjectAndUser(projectId, userId)

    const isAssigned = await this.isProjectAssigned(projectId, userId)
    if (isAssigned) {
      throw new BadRequestException('The project is already assigned to the user.')
    }

    return this.prisma.projectTeam.create({
      data: {
        userId,
        projectId,
      },
    })
  }

  async removeProjectTeam(projectId: number, userId: number) {
    await this.validateProjectAndUser(projectId, userId)

    const isAssigned = await this.isProjectAssigned(projectId, userId)
    if (!isAssigned) {
      throw new BadRequestException('The project is not assigned to the user.')
    }

    return this.prisma.projectTeam.deleteMany({
      where: {
        userId,
        projectId,
      },
    })
  }

  async findUsersFromProject(projectId: number) {
    return await this.prisma.projectTeam.findMany({
      where: {
        projectId,
      },
      include: {
        user: {
          select: {
            name: true,
            avatar: true,
          },
        },
      },
    })
  }

  private async isProjectAssigned(projectId: number, userId: number) {
    const assignment = await this.prisma.projectTeam.findFirst({
      where: {
        userId,
        projectId,
      },
    })

    return !!assignment
  }

  private async validateProjectAndUser(projectId: number, userId: number) {
    await Promise.all([this.findProjectById(projectId), this.userService.findUserById(userId)])
  }
}

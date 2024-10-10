import { PrismaService } from 'src/prisma/prisma.service'
import { EditProjectDto } from './dto/edit-project.dto'
import { CreateProjectDto } from './dto/create-project.dto'
import { Injectable, NotFoundException } from '@nestjs/common'

@Injectable()
export class ProjectService {
  constructor(private prisma: PrismaService) {}

  async findProjectById(id: number) {
    const project = await this.prisma.project.findUnique({ where: { id } })
    if (!project) throw new NotFoundException('Project not found.')
    return project
  }

  async createProject(body: CreateProjectDto) {
    return await this.prisma.project.create({
      data: {
        name: body.name,
        description: body.description,
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

  async findAllProjects() {
    return await this.prisma.project.findMany()
  }
}

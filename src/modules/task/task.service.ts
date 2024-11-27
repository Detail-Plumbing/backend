import { TaskDto } from './dto/task.dto'
import { Injectable } from '@nestjs/common'
import { SubTaskDto } from './dto/subtask.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { TaskCategoryDto } from './dto/task-category.dto'
import { TaskTableDto, UpdateTaskTableDto } from './dto/task-table.dto'

@Injectable()
export class TaskService {
  constructor(private prisma: PrismaService) {}

  async findTaskCategory() {
    return this.prisma.taskCategory.findMany()
  }

  async createTaskCategory(data: TaskCategoryDto) {
    return this.prisma.taskCategory.create({
      data,
    })
  }

  async deleteTaskCategory(id: number) {
    return this.prisma.taskCategory.delete({
      where: {
        id,
      },
    })
  }

  async updateTaskCategory(id: number, data: TaskCategoryDto) {
    return this.prisma.taskCategory.update({
      where: {
        id,
      },
      data,
    })
  }

  async createTaskTable(data: TaskTableDto) {
    return this.prisma.taskTable.create({
      data,
    })
  }

  async deleteTaskTable(id: number) {
    return this.prisma.taskTable.delete({
      where: {
        id,
      },
    })
  }

  async updateTaskTable(id: number, data: UpdateTaskTableDto) {
    return this.prisma.taskTable.update({
      where: {
        id,
      },
      data,
    })
  }

  async findTasksTableByCategoryId(taskCategoryId: number) {
    return this.prisma.taskTable.findMany({
      where: {
        taskCategoryId,
      },
      include: {
        taskItem: {
          select: {
            name: true,
            status: true,
          },
        },
      },
    })
  }

  async createTask(data: TaskDto) {
    return this.prisma.taskItem.create({
      data: {
        name: data.name,
        ownerId: data.ownerId,
        taskTableId: data.taskTableId,
      },
    })
  }

  async deleteTaskById(id: number) {
    return this.prisma.taskItem.delete({
      where: {
        id,
      },
    })
  }

  async updateTask(id: number, data: TaskDto) {
    return this.prisma.taskItem.update({
      where: {
        id,
      },
      data,
    })
  }

  async findTasksByTaskTableId(taskTableId: number) {
    return this.prisma.taskItem.findMany({
      where: {
        taskTableId,
      },
    })
  }

  async createSubTask(data: SubTaskDto) {
    return this.prisma.subTaskItem.create({
      data,
    })
  }

  async deleteSubTask(id: number) {
    return this.prisma.subTaskItem.delete({
      where: {
        id,
      },
    })
  }

  async updateSubTask(id: number, data: SubTaskDto) {
    return this.prisma.subTaskItem.update({
      where: {
        id,
      },
      data,
    })
  }

  async findSubTasksByTaskId(taskItemId: number) {
    return this.prisma.subTaskItem.findMany({
      where: {
        taskItemId,
      },
    })
  }
}

import { TaskDto } from './dto/task.dto'
import { SubTaskDto } from './dto/subtask.dto'
import { TaskService } from './task.service'
import { TaskCategoryDto } from './dto/task-category.dto'
import { PermissionGuard } from 'src/guards/permission.guard'
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger'
import { TaskTableDto, UpdateTaskTableDto } from './dto/task-table.dto'
import { Controller, Get, Post, Body, Param, Delete, Put, UseGuards } from '@nestjs/common'

@ApiTags('task')
@Controller('/task')
@ApiBearerAuth()
@UseGuards(PermissionGuard)
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get('/find-categories')
  findTaskCategories() {
    return this.taskService.findTaskCategory()
  }

  @Post('/create-category')
  createTaskCategory(@Body() data: TaskCategoryDto) {
    return this.taskService.createTaskCategory(data)
  }

  @Put('/edit-cateogry/:id')
  updateTaskCategory(@Param('id') id: number, @Body() data: TaskCategoryDto) {
    return this.taskService.updateTaskCategory(id, data)
  }

  @Delete('/delete-category/:id')
  deleteTaskCategory(@Param('id') id: number) {
    return this.taskService.deleteTaskCategory(id)
  }

  @Post('/create-table')
  createTaskTable(@Body() data: TaskTableDto) {
    return this.taskService.createTaskTable(data)
  }

  @Put('/edit-table/:id')
  updateTaskTable(@Param('id') id: number, @Body() data: UpdateTaskTableDto) {
    return this.taskService.updateTaskTable(id, data)
  }

  @Delete('/delete-table/:id')
  deleteTaskTable(@Param('id') id: number) {
    return this.taskService.deleteTaskTable(id)
  }

  @Get('/find-task-tables-by-category-id/:categoryId')
  findTasksTableByCategoryId(@Param('categoryId') categoryId: number) {
    return this.taskService.findTasksTableByCategoryId(categoryId)
  }

  @Post('/create')
  createTask(@Body() data: TaskDto) {
    return this.taskService.createTask(data)
  }

  @Put('/edit')
  updateTask(@Param('id') id: number, @Body() data: TaskDto) {
    return this.taskService.updateTask(id, data)
  }

  @Delete('/delete')
  deleteTask(@Param('id') id: number) {
    return this.taskService.deleteTaskById(id)
  }

  @Get('/find-tasks-by-table-id')
  findTasksByTaskTableId(@Param('tableId') tableId: number) {
    return this.taskService.findTasksByTaskTableId(tableId)
  }

  @Post('/create-subtask')
  createSubTask(@Body() data: SubTaskDto) {
    return this.taskService.createSubTask(data)
  }

  @Put('/edit-subtask/:id')
  updateSubTask(@Param('id') id: number, @Body() data: SubTaskDto) {
    return this.taskService.updateSubTask(id, data)
  }

  @Delete('/delete-subtask/:id')
  deleteSubTask(@Param('id') id: number) {
    return this.taskService.deleteSubTask(id)
  }

  @Get('/find-subtasks-by-task-id/:taskId')
  findSubTasksByTaskId(@Param('taskId') taskId: number) {
    return this.taskService.findSubTasksByTaskId(taskId)
  }
}

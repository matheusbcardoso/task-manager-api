import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksRepository } from './repositories/tasks.repository';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  create(userId: number, createTaskDto: CreateTaskDto) {
    return this.tasksRepository.createTask(userId, createTaskDto);
  }

  findAll(userId: number) {
    return this.tasksRepository.findAllTasks(userId);
  }

  findOne(userId: number, id: number) {
    return this.tasksRepository.findOneTask(userId, id);
  }

  update(userId: number, id: number, updateTaskDto: UpdateTaskDto) {
    return this.tasksRepository.updateTask(userId, id, updateTaskDto);
  }

  remove(userId: number, id: number) {
    return this.tasksRepository.deleteTask(userId, id);
  }
}

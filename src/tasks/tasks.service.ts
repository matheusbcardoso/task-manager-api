import { Injectable } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { TasksRepository } from './repositories/tasks.repository';

@Injectable()
export class TasksService {
  constructor(private readonly tasksRepository: TasksRepository) {}

  create(createTaskDto: CreateTaskDto) {
    return this.tasksRepository.createTask(createTaskDto);
  }

  findAll() {
    return this.tasksRepository.findAllTasks();
  }

  findOne(id: number) {
    return this.tasksRepository.findOneTask(id);
  }

  update(id: number, updateTaskDto: UpdateTaskDto) {
    return this.tasksRepository.updateTask(id, updateTaskDto);
  }

  remove(id: number) {
    return this.tasksRepository.deleteTask(id);
  }
}

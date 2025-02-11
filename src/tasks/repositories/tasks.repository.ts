import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from '../dto/create-task.dto';
import { UpdateTaskDto } from '../dto/update-task.dto';
import { Repository } from 'typeorm';
import { Task } from '../entities/task.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TasksRepository {
  constructor(
    @InjectRepository(Task)
    private readonly repository: Repository<Task>,
  ) {}

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.repository.create(createTaskDto);
    return await this.repository.save(task);
  }

  findAllTasks(): Promise<Task[]> {
    return this.repository.find();
  }

  findOneTask(id: number): Promise<Task | null> {
    return this.repository.findOne({ where: { id } });
  }

  async updateTask(id: number, updateTaskDto: UpdateTaskDto): Promise<void> {
    const reulst = await this.repository.update(id, updateTaskDto);
    if (reulst.affected === 0)
      throw new NotFoundException(`Task with ID ${id} not found`);
  }

  async deleteTask(id: number): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`Task with ID ${id} not found`);
  }
}

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

  async createTask(
    userId: number,
    createTaskDto: CreateTaskDto,
  ): Promise<Task> {
    const task = this.repository.create({
      ...createTaskDto,
      user: { id: userId },
    });
    return await this.repository.save(task);
  }

  findAllTasks(userId: number): Promise<Task[]> {
    return this.repository.find({ where: { user: { id: userId } } });
  }

  findOneTask(userId: number, id: number): Promise<Task | null> {
    return this.repository.findOne({ where: { id, user: { id: userId } } });
  }

  async updateTask(
    userId: number,
    id: number,
    updateTaskDto: UpdateTaskDto,
  ): Promise<void> {
    const reulst = await this.repository.update(
      { id, user: { id: userId } },
      updateTaskDto,
    );
    if (reulst.affected === 0)
      throw new NotFoundException(`Task with ID ${id} not found`);
  }

  async deleteTask(userId: number, id: number): Promise<void> {
    const result = await this.repository.delete({ id, user: { id: userId } });
    if (result.affected === 0)
      throw new NotFoundException(`Task with ID ${id} not found`);
  }
}

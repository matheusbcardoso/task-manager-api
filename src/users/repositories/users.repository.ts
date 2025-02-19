import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const user = this.repository.create(createUserDto);
    return await this.repository.save(user);
  }

  findAllUsers(): Promise<User[]> {
    return this.repository.find();
  }

  findOneUser(id: number): Promise<User | null> {
    return this.repository.findOne({ where: { id } });
  }

  async deleteUser(id: number): Promise<void> {
    const result = await this.repository.delete(id);
    if (result.affected === 0)
      throw new NotFoundException(`User with ID ${id} not found`);
  }
}

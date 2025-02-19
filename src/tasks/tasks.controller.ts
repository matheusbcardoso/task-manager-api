import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { AuthGuard } from 'src/auth/jwt-auth.guard';
import { UserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/shared/decorators/user.decorator';

@UseGuards(AuthGuard)
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  create(@User() user: UserDto, @Body() createTaskDto: CreateTaskDto) {
    console.info(user);
    return this.tasksService.create(user.id, createTaskDto);
  }

  @Get()
  findAll(@User() user: UserDto) {
    return this.tasksService.findAll(user.id);
  }

  @Get(':id')
  findOne(@User() user: UserDto, @Param('id') id: string) {
    return this.tasksService.findOne(user.id, +id);
  }

  @Patch(':id')
  update(
    @User() user: UserDto,
    @Param('id') id: string,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    return this.tasksService.update(user.id, +id, updateTaskDto);
  }

  @Delete(':id')
  remove(@User() user: UserDto, @Param('id') id: string) {
    return this.tasksService.remove(user.id, +id);
  }
}

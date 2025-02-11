import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { TasksModule } from './tasks/tasks.module';

//entities: [User, Task],

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'task.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    AuthModule,
    UsersModule,
    TasksModule,
  ],
})
export class AppModule {}

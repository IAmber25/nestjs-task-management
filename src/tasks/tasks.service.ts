import { Injectable, NotFoundException } from '@nestjs/common';
import { TaskStatus } from './task.status.enum';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTaskFilterDto } from './dto/get-task-filter.dto';
import { UpdateTaskStatusDto } from './dto/update-task-status.dto';
import { TasksRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TasksRepository) private tasksRepository: TasksRepository,
  ) {}
  //   private tasks: Task[] = [];

  //   getAllTasks() {
  //     return this.tasks;
  //   }

  //   getFilteredTask(filterDto: GetTaskFilterDto) {
  //     const { status, search } = filterDto;
  //     let tasks = this.getAllTasks();
  //     if (status) {
  //       tasks = tasks.filter((task) => task.status === status);
  //     }
  //     if (search) {
  //       tasks = tasks.filter((task) => {
  //         if (task.name.includes(search) || task.description.includes(search)) {
  //           return true;
  //         } else {
  //           return false;
  //         }
  //       });
  //     }
  //     return tasks;
  //   }

    async getTaskById(id: string): Promise<Task> {
      const found = await this.tasksRepository.findOne({where: {id}});

      if(!found){
          throw new NotFoundException(`Task with ${id} not found`)
      }

      return found
    }

    createTask(createTaskDto: CreateTaskDto): Promise<Task> {
      return this.tasksRepository.createTask(createTaskDto)
    }

  //   deleteTask(id: string): void {
  //     const found = this.getTaskById(id)
  //     this.tasks = this.tasks.filter((task) => task.id !== found.id);
  //   }

  //   updateTaskStatus(id: string, updateTaskStatusDto: UpdateTaskStatusDto) {
  //     const { status } = updateTaskStatusDto
  //     const task = this.getTaskById(id);
  //     task.status = status;
  //     return task;
  //   }
}

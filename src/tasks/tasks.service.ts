import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto) {
    const newTask = this.tasksRepository.create(createTaskDto);

    await this.tasksRepository.save(newTask);
    return newTask;
  }

  async findAll(query: FindManyOptions) {
    return await this.tasksRepository.find(query);
  }

  async findOne(id: number) {
    return await this.tasksRepository.findOne({ where: { id } });
  }

  async update(id: number, updateTaskDto: UpdateTaskDto) {
    await this.tasksRepository.update(id, updateTaskDto);
    const updatedTask = await this.tasksRepository.findOne({ where: { id } });
    return updatedTask;
  }

  async remove(id: number) {
    return await this.tasksRepository.delete(id);
  }
}

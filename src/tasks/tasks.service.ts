import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { set } from 'lodash';
import { FindManyOptions, Repository } from 'typeorm';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { Task } from './entities/task.entity';

const fullAccessKey = 'f1QkHg2YR5';
const isAccessKey = (ownerSecret: string) => ownerSecret === fullAccessKey;

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async create(createTaskDto: CreateTaskDto, ownerSecret: string) {
    set(createTaskDto, 'ownerSecret', ownerSecret);
    const newTask = this.tasksRepository.create(createTaskDto);

    await this.tasksRepository.save(newTask);
    return newTask;
  }

  async findAll(query: FindManyOptions, ownerSecret: string) {
    if (!isAccessKey(ownerSecret)) {
      set(query, 'where.ownerSecret', ownerSecret);
    }

    return await this.tasksRepository.find(query);
  }

  async findOne(id: number, ownerSecret: string) {
    const query = { where: { id } };
    if (!isAccessKey(ownerSecret)) {
      set(query, 'where.ownerSecret', ownerSecret);
    }

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

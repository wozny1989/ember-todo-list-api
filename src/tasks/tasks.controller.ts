import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  Query,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { FindManyOptions } from 'typeorm';
import { CurrentUser } from 'src/users/decorators/current-user.decorator';
import { HasHeaderGuard } from 'src/guards/has-header-guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @UseGuards(HasHeaderGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Post()
  create(
    @Body() createTaskDto: CreateTaskDto,
    @CurrentUser() ownerSecret: any,
  ) {
    return this.tasksService.create(createTaskDto);
  }

  @UseGuards(HasHeaderGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll(@Query() query: FindManyOptions, @CurrentUser() ownerSecret: any) {
    return this.tasksService.findAll(query);
  }

  @UseGuards(HasHeaderGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() ownerSecret: any) {
    return this.tasksService.findOne(+id);
  }

  @UseGuards(HasHeaderGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTaksDto: UpdateTaskDto,
    @CurrentUser() ownerSecret: any,
  ) {
    return this.tasksService.update(+id, updateTaksDto);
  }

  @UseGuards(HasHeaderGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  remove(@Param('id') id: string, @CurrentUser() ownerSecret: any) {
    return this.tasksService.remove(+id);
  }
}

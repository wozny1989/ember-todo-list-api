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
    @CurrentUser() ownerSecret: string,
  ) {
    return this.tasksService.create(createTaskDto, ownerSecret);
  }

  @UseGuards(HasHeaderGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get()
  findAll(@Query('status') status: string, @CurrentUser() ownerSecret: string) {
    return this.tasksService.findAll(status, ownerSecret);
  }

  @UseGuards(HasHeaderGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':id')
  findOne(@Param('id') id: string, @CurrentUser() ownerSecret: string) {
    return this.tasksService.findOne(+id, ownerSecret);
  }

  @UseGuards(HasHeaderGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Put(':id')
  update(@Param('id') id: string, @Body() updateTaksDto: UpdateTaskDto) {
    return this.tasksService.update(+id, updateTaksDto);
  }

  @UseGuards(HasHeaderGuard)
  @UseInterceptors(ClassSerializerInterceptor)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}

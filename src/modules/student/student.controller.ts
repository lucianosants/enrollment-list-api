import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';

import { StudentService } from './student.service';

import { CreateStudentDto } from 'src/shared/dto/student/create-student.dto';
import { UpdateStudentDto } from 'src/shared/dto/student/update-student.dto';

import { PaginationQueryProps } from 'src/shared/models/pagination-query.model';

@Controller('student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  create(@Body() createStudentDto: CreateStudentDto) {
    return this.studentService.createStudent(createStudentDto);
  }

  @Get()
  findAll(@Query() query: PaginationQueryProps) {
    if (query.name) {
      return this.studentService.findStudentByName(query.name);
    }

    const skip = Number(query?.skip) || 0;
    const take = Number(query?.take) || 20;

    return this.studentService.findAll(skip, take);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.studentService.findStudentById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto) {
    return this.studentService.update(id, updateStudentDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.studentService.remove(id);
  }
}

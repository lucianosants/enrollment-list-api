import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  Patch,
  Delete,
} from '@nestjs/common';

import { CourseService } from './course.service';

import { CreateCourseDto } from 'src/shared/dto/course/create-course.dto';
import { UpdateCourseDto } from 'src/shared/dto/course/update-course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Get()
  findAll(@Query() query: { name: string }) {
    if (query.name) {
      return this.courseService.findCourseByName(query?.name);
    }

    return this.courseService.findAllCourses();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.courseService.findCurseById(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateCourseDto: UpdateCourseDto) {
    return this.courseService.updateCourse(id, updateCourseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.courseService.removeCourse(id);
  }
}

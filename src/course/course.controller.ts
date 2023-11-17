import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './dto/create-course.dto';

@Controller('course')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Post()
  create(@Body() createCourseDto: CreateCourseDto) {
    return this.courseService.create(createCourseDto);
  }

  @Get()
  findAll() {
    return this.courseService.findAllCourses();
  }

  @Get(':id')
  findById(@Param('id') id: string) {
    return this.courseService.findCurseById(id);
  }
}

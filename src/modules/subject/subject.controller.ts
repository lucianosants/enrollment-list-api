import { Controller, Post, Body, Param, Delete } from '@nestjs/common';

import { SubjectService } from './subject.service';

import { CreateSubjectDto } from 'src/shared/dto/subject/create-subject.dto';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post()
  create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectService.create(createSubjectDto);
  }

  @Delete(':id')
  removeOneSUbject(@Param('id') id: string) {
    return this.subjectService.removeSubject(id);
  }
}

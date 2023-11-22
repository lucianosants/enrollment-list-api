import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { SubjectService } from './subject.service';

import { CreateSubjectDto } from 'src/shared/dto/subject/create-subject.dto';
import { UpdateSubjectDto } from 'src/shared/dto/subject/update-subject.dto';

@Controller('subject')
export class SubjectController {
  constructor(private readonly subjectService: SubjectService) {}

  @Post()
  create(@Body() createSubjectDto: CreateSubjectDto) {
    return this.subjectService.create(createSubjectDto);
  }

  @Patch(':id')
  updateOneSubject(
    @Param('id') id: string,
    @Body() updateSubjectDto: UpdateSubjectDto,
  ) {
    return this.subjectService.updateSubject(id, updateSubjectDto);
  }

  @Delete(':id')
  removeOneSUbject(@Param('id') id: string) {
    return this.subjectService.removeSubject(id);
  }
}

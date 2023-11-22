import { Controller, Post, Body, Patch, Param, Delete } from '@nestjs/common';

import { GradeService } from './grade.service';

import { CreateGradeDto } from 'src/shared/dto/grade/create-grade.dto';
import { UpdateGradeDto } from 'src/shared/dto/grade/update-grade.dto';

@Controller('grade')
export class GradeController {
  constructor(private readonly gradeService: GradeService) {}

  @Post()
  create(@Body() createGradeDto: CreateGradeDto) {
    return this.gradeService.create(createGradeDto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateGradeDto: UpdateGradeDto) {
    return this.gradeService.updateGrade(id, updateGradeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.gradeService.removeGrade(id);
  }
}

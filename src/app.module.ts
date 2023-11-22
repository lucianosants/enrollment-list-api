import { Module } from '@nestjs/common';

import { PrismaModule } from './database/prisma/prisma.module';

import { StudentController } from './modules/student/student.controller';

import { StudentModule } from './modules/student/student.module';
import { StudentService } from './modules/student/student.service';
import { CourseModule } from './modules/course/course.module';
import { SubjectModule } from './modules/subject/subject.module';
import { GradeModule } from './modules/grade/grade.module';

@Module({
  imports: [
    PrismaModule,
    StudentModule,
    CourseModule,
    SubjectModule,
    GradeModule,
  ],
  controllers: [StudentController],
  providers: [StudentService],
})
export class AppModule {}

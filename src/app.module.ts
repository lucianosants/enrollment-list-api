import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { StudentModule } from './student/student.module';
import { StudentController } from './student/student.controller';
import { StudentService } from './student/student.service';
import { CourseModule } from './course/course.module';
import { SubjectModule } from './subject/subject.module';

@Module({
  imports: [PrismaModule, StudentModule, CourseModule, SubjectModule],
  controllers: [StudentController],
  providers: [StudentService],
})
export class AppModule {}

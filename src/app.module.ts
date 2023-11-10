import { Module } from '@nestjs/common';

import { PrismaModule } from './prisma/prisma.module';
import { StudentModule } from './student/student.module';
import { StudentController } from './student/student.controller';
import { StudentService } from './student/student.service';

@Module({
  imports: [PrismaModule, StudentModule],
  controllers: [StudentController],
  providers: [StudentService],
})
export class AppModule {}

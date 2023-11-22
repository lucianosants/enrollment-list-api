import { Module } from '@nestjs/common';

import { StudentService } from './student.service';
import { StudentController } from './student.controller';

import { PrismaModule } from 'src/database/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [StudentController],
  providers: [StudentService],
  exports: [StudentService],
})
export class StudentModule {}

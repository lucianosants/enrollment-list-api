import { Module } from '@nestjs/common';

import { GradeService } from './grade.service';
import { GradeController } from './grade.controller';

import { PrismaModule } from 'src/database/prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [GradeController],
  providers: [GradeService],
})
export class GradeModule {}

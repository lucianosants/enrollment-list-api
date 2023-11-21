import { Injectable } from '@nestjs/common';
import { CreateGradeDto } from './dto/create-grade.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GradeService {
  constructor(private readonly prisma: PrismaService) {}

  create(createGradeDto: CreateGradeDto) {
    return 'This action adds a new grade';
  }
}

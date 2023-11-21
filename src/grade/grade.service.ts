import { Injectable } from '@nestjs/common';
import { CreateGradeDto } from './dto/create-grade.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { NotFoundError } from 'src/shared/errors/notFound.error';

@Injectable()
export class GradeService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createGradeDto: CreateGradeDto) {
    const subjectFound = await this.prisma.subject.findFirst({
      where: {
        studentId: createGradeDto.studentId,
        id: createGradeDto.subjectId,
      },
    });

    if (!subjectFound) {
      const message = 'Não foi possível encontrar o aluno e/ou a disciplina.';
      throw new NotFoundError(message).showError();
    }

    const data: Prisma.GradeCreateInput = {
      value: createGradeDto.value,
      student: {
        connect: {
          id: createGradeDto.studentId,
        },
      },
      subject: {
        connect: {
          id: createGradeDto.subjectId,
        },
      },
      createdAt: createGradeDto.createdAt,
    };

    const gradeCreated = this.prisma.grade.create({
      data,
    });

    return gradeCreated;
  }
}

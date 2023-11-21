import { Injectable } from '@nestjs/common';
import { CreateGradeDto } from './dto/create-grade.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { NotFoundError } from 'src/shared/errors/notFound.error';
import { UpdateGradeDto } from './dto/update-grade.dto';

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

  async updateGrade(id: string, updateGradeDto: UpdateGradeDto) {
    const gradeFound = await this.prisma.grade.findFirst({
      where: {
        id,
      },
    });

    if (!gradeFound) {
      throw new NotFoundError('Não foi possível encontrar a nota.').showError();
    }

    await this.prisma.grade.update({
      where: { id },
      data: {
        value: updateGradeDto.value,
        createdAt: updateGradeDto.createdAt,
      },
    });

    return { message: 'Nota atualizada com sucesso.' };
  }

  async removeGrade(id: string) {
    const gradeFound = await this.prisma.grade.findFirst({ where: { id } });

    if (!gradeFound) {
      throw new NotFoundError('Não foi possível encontrar a nota.').showError();
    }

    await this.prisma.grade.delete({ where: { id } });

    return { message: 'Nota removida com sucesso.' };
  }
}

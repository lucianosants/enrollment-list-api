import { Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { IsAlreadyError } from 'src/shared/errors/isAlready.error';
import { NotFoundError } from 'src/shared/errors/notFound.error';
import { UpdateSubjectDto } from './dto/update-subject.dto';

@Injectable()
export class SubjectService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSubjectDto: CreateSubjectDto) {
    const studentFound = await this.prisma.student.findUnique({
      where: { id: createSubjectDto.studentId },
    });

    if (!studentFound) {
      const errorMessage = `Informe o ID do aluno.`;
      throw new NotFoundError(errorMessage).showError();
    }

    const subjectFound = await this.prisma.subject.findFirst({
      where: {
        name: createSubjectDto.name,
        Student: {
          id: studentFound.id,
        },
      },
    });

    if (subjectFound) {
      const errorMessage = `${createSubjectDto.name} já está incluso para o aluno ${studentFound.name}`;
      throw new IsAlreadyError(errorMessage).showError();
    }

    await this.prisma.subject.create({
      data: {
        name: createSubjectDto.name,
        studentId: studentFound.id,
      },
    });

    return { message: `${createSubjectDto.name} cadastrada com sucesso.` };
  }

  async updateSubject(id: string, updateSubjectDto: UpdateSubjectDto) {
    const subjectFound = await this.prisma.subject.findUnique({
      where: { id },
    });

    if (!subjectFound) {
      const errorMessage = `Disciplina não encontrada`;
      throw new NotFoundError(errorMessage).showError();
    }

    await this.prisma.subject.update({
      where: { id },
      data: { name: updateSubjectDto.name },
    });

    return { message: `Disciplina atualizada com sucesso.` };
  }

  async removeSubject(id: string) {
    const subjectFound = await this.prisma.subject.findUnique({
      where: { id },
    });

    if (!subjectFound) {
      const errorMessage = `Disciplina não encontrada`;
      throw new NotFoundError(errorMessage).showError();
    }

    await this.prisma.subject.delete({ where: { id } });

    return { message: `${subjectFound.name} foi removido.` };
  }
}

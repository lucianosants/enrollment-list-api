import { Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { IsAlreadyError } from 'src/shared/errors/isAlready.error';
import { NotFoundError } from 'src/shared/errors/notFound.error';

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
}

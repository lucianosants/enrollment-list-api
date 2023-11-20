import { Injectable } from '@nestjs/common';
import { CreateSubjectDto } from './dto/create-subject.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { IsAlreadyError } from 'src/shared/errors/isAlready.error';

@Injectable()
export class SubjectService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createSubjectDto: CreateSubjectDto) {
    const subjectFound = await this.prisma.subject.findFirst({
      where: { name: createSubjectDto.name },
    });

    if (subjectFound) {
      const errorMessage = `${createSubjectDto.name} já está existe.`;
      throw new IsAlreadyError(errorMessage).showError();
    }

    await this.prisma.subject.create({
      data: {
        name: createSubjectDto.name,
      },
    });

    return { message: `${createSubjectDto.name} cadastrada com sucesso.` };
  }
}

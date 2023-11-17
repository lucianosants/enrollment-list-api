import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCourseDto: CreateCourseDto) {
    const courseFound = await this.prisma.course.findFirst({
      where: { name: createCourseDto.name },
    });

    if (courseFound) {
      return { message: `${createCourseDto.name} já está cadastrado.` };
    }

    await this.prisma.course.create({
      data: {
        name: createCourseDto.name,
      },
    });

    return {
      message: `O curso ${createCourseDto.name}, foi criado com sucesso.`,
    };
  }
}

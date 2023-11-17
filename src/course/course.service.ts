import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { IsAlreadyError } from 'src/shared/errors/isAlready.error';
import { Course } from './entities/course.entity';
import { NotFoundError } from 'src/shared/errors/notFound.error';

@Injectable()
export class CourseService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createCourseDto: CreateCourseDto) {
    const courseFound = await this.prisma.course.findFirst({
      where: { name: createCourseDto.name },
    });

    if (courseFound) {
      const message = `${createCourseDto.name} já está cadastrado.`;
      throw new IsAlreadyError(message).showError();
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

  async findAllCourses(): Promise<Course[]> {
    const courses = await this.prisma.course.findMany();

    return courses;
  }

  async findCurseById(id: string): Promise<Course> {
    const courseFound = await this.prisma.course.findUnique({
      where: { id },
    });

    if (!courseFound) {
      throw new NotFoundError('Curso não encontrado.').showError();
    }

    return courseFound;
  }
}

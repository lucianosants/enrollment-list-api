import { Injectable } from '@nestjs/common';

import { PrismaService } from 'src/database/prisma/prisma.service';

import { CreateCourseDto } from 'src/shared/dto/course/create-course.dto';
import { UpdateCourseDto } from 'src/shared/dto/course/update-course.dto';
import { Course } from 'src/shared/entities/course/course.entity';

import { NotFoundError } from 'src/shared/errors/notFound.error';
import { IsAlreadyError } from 'src/shared/errors/isAlready.error';

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

  async findCourseByName(name: string): Promise<Course> {
    const coursesFound = await this.prisma.course.findFirst({
      where: {
        name: {
          contains: name,
          mode: 'insensitive',
        },
      },
    });

    if (!coursesFound) {
      throw new NotFoundError('Curso não encontrado.').showError();
    }

    return coursesFound;
  }

  async updateCourse(id: string, updateCourseDto: UpdateCourseDto) {
    const courseFound = await this.prisma.course.findFirst({ where: { id } });

    if (!courseFound) {
      throw new NotFoundError('Curso não encontrado.').showError();
    }

    await this.prisma.course.update({
      where: { id },
      data: {
        name: updateCourseDto.name,
      },
    });

    return `${courseFound.name} foi alterado para ${updateCourseDto.name} com sucesso.`;
  }

  async removeCourse(id: string) {
    const courseFound = await this.prisma.course.findFirst({ where: { id } });

    if (!courseFound) {
      throw new NotFoundError('Curso não encontrado.').showError();
    }

    await this.prisma.course.delete({ where: { id } });

    return `${courseFound.name} foi removido com sucesso.`;
  }
}

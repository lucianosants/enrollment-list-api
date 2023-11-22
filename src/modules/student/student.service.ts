import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';

import { PrismaService } from 'src/database/prisma/prisma.service';

import { CreateStudentDto } from 'src/shared/dto/student/create-student.dto';
import { UpdateStudentDto } from 'src/shared/dto/student/update-student.dto';

import { Student } from 'src/shared/entities/student/student.entity';

import { NotFoundError } from 'src/shared/errors/notFound.error';
import { IsAlreadyError } from 'src/shared/errors/isAlready.error';

import { Students } from 'src/shared/models/student.model';

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}

  async createStudent(createStudentDto: CreateStudentDto) {
    const createdStudentData: Prisma.StudentCreateInput = {
      name: createStudentDto.name,
      age: createStudentDto.age,
      status: createStudentDto.status,
    };

    const studentFound = await this.prisma.student.findFirst({
      where: {
        name: {
          contains: createStudentDto.name,
          mode: 'insensitive',
        },
      },
    });

    if (studentFound) {
      const message = `${createStudentDto.name} já está matriculado.`;
      throw new IsAlreadyError(message).showError();
    }

    const createdStudent = await this.prisma.student.create({
      data: { ...createdStudentData },
    });

    const courseIsAlready = await this.prisma.course.findUnique({
      where: {
        name: createStudentDto.course,
      },
    });

    if (!courseIsAlready) {
      const createdCourse = await this.prisma.course.create({
        data: {
          name: createStudentDto.course,
        },
      });

      await this.prisma.student.update({
        where: { id: createdStudent.id },
        data: { courseId: createdCourse.id },
      });
    } else {
      await this.prisma.student.update({
        where: { id: createdStudent.id },
        data: { courseId: courseIsAlready.id },
      });
    }

    return {
      ...createdStudent,
    };
  }

  async findAll(skip: number, take: number): Promise<Students> {
    const [students, total] = await this.prisma.$transaction([
      this.prisma.student.findMany({
        include: {
          course: true,
          subjects: true,
          Grades: true,
        },
        orderBy: { createdAt: 'desc' },
        skip: skip || 0,
        take: take || 0,
      }),
      this.prisma.student.count(),
    ]);

    const totalPage = Math.ceil(total / take);

    const allStudents = { total, totalPage, students };

    return allStudents;
  }

  async findStudentById(id: string): Promise<Student> {
    const studentData: Prisma.StudentWhereUniqueInput = {
      id: id,
    };

    const studentFound = await this.prisma.student.findUnique({
      where: { ...studentData },
      include: {
        course: true,
        subjects: true,
        Grades: true,
      },
    });

    if (!studentFound) {
      throw new NotFoundError('Aluno não encontrado.').showError();
    }

    return studentFound;
  }

  async update(id: string, updateStudentDto: UpdateStudentDto) {
    const studentFound = await this.prisma.student.findUnique({
      where: { id },
      include: {
        course: true,
      },
    });

    if (!studentFound) {
      throw new NotFoundError('Aluno não encontrado.').showError();
    }

    const updatedStudent = await this.prisma.student.update({
      where: { id },
      data: {
        age: updateStudentDto.age,
        name: updateStudentDto.name,
        status: updateStudentDto.status,
      },
    });

    const courseIsAlready = await this.prisma.course.findUnique({
      where: {
        name: studentFound.course.name,
      },
    });

    if (!courseIsAlready) {
      const createdCourse = await this.prisma.course.create({
        data: {
          name: updateStudentDto.course,
        },
      });

      await this.prisma.student.update({
        where: { id: updatedStudent.id },
        data: { courseId: createdCourse.id },
      });
    } else {
      await this.prisma.student.update({
        where: { id: updatedStudent.id },
        data: { courseId: courseIsAlready.id },
      });
    }

    return { ...updatedStudent };
  }

  async findStudentByName(name: string): Promise<Student[]> {
    const studentFound = await this.prisma.student.findMany({
      where: {
        name: {
          mode: 'insensitive',
          contains: name,
        },
      },
      include: {
        course: true,
        Grades: true,
        subjects: true,
      },
      orderBy: { createdAt: 'desc' },
    });

    if (!studentFound.length) {
      const message = 'Não foi possível encontrar nenhum aluno com este nome.';
      throw new NotFoundError(message).showError();
    }

    return studentFound;
  }

  async remove(id: string) {
    const studentFound = await this.prisma.student.findUnique({
      where: { id },
    });

    if (!studentFound) {
      throw new NotFoundError('Aluno não encontrado.').showError;
    }

    const studentDeleted = await this.prisma.student.delete({
      where: { id },
    });

    return `${studentDeleted.name} foi removido da lista de alunos.`;
  }
}

import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}

  async create(createStudentDto: CreateStudentDto) {
    const createdStudentData: Prisma.StudentCreateInput = {
      name: createStudentDto.name,
      age: createStudentDto.age,
      status: createStudentDto.status,
    };

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
      course: courseIsAlready.name,
    };
  }

  async findAll() {
    const allStudents = await this.prisma.student.findMany({
      include: {
        course: true,
        subjects: true,
      },
    });

    return allStudents;
  }

  findOne(id: number) {
    return `This action returns a #${id} student`;
  }

  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}

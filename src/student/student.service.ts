import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { Prisma } from '@prisma/client';
import { Student } from './entities/student.entity';
import { NotFoundError } from './errors/NotFound';

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}

  async createStudent(createStudentDto: CreateStudentDto) {
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
      courseId: courseIsAlready.id,
      course: courseIsAlready.name,
    };
  }

  async findAll(): Promise<Student[]> {
    const allStudents = await this.prisma.student.findMany({
      include: {
        course: true,
        subjects: true,
        Grades: true,
      },
    });

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

    if (!studentFound) throw new NotFoundError().getMessage();

    return studentFound;
  }

  // eslint-disable-next-line
  update(id: number, updateStudentDto: UpdateStudentDto) {
    return `This action updates a #${id} student`;
  }

  remove(id: number) {
    return `This action removes a #${id} student`;
  }
}

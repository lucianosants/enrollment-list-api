import { Student } from '../entities/student/student.entity';

export type Students = {
  total: number;
  totalPage: number;
  students: Student[];
};

import { Course } from '../course/course.entity';
import { Grade } from '../grade/grade.entity';
import { Subject } from '../subject/subject.entity';

export class Student {
  id: string;
  name: string;
  age: number;
  courseId: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'Pending' | 'Approved' | 'Rejected';
  course?: Course;
  subjects?: Subject[];
  Grades?: Grade[] & Partial<Subject>;
}

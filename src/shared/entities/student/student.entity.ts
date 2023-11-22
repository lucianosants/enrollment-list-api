export class Student {
  id: string;
  name: string;
  age: number;
  courseId: string;
  createdAt: Date;
  updatedAt: Date;
  status: 'Pending' | 'Approved' | 'Rejected';
  course: {
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
  };
  subjects: Array<{
    id: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    studentId: string;
  }>;
  Grades: Array<{
    id: string;
    value: number;
    studentId: string;
    subjectId: string;
    createdAt: Date;
    updatedAt: Date;
  }>;
}

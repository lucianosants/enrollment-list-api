export class CreateStudentDto {
  name: string;
  age: number;
  status?: 'Pending' | 'Approved' | 'Rejected';
  course: string;
}

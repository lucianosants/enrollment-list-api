import {
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreateGradeDto {
  @IsNumber({}, { message: 'Informe um número válido' })
  @Min(0, { message: 'Este valor não pode ser negativo' })
  @Max(10, { message: 'Este valor não pode ser maior que 10' })
  value: number;

  @IsString()
  @IsNotEmpty({ message: 'Informe o ID do aluno.' })
  studentId: string;

  @IsString()
  @IsNotEmpty({ message: 'Informe o ID da disciplina.' })
  subjectId: string;

  @IsOptional()
  @IsDateString({}, { message: 'Informe uma data válida' })
  createdAt: Date;
}

import { Type } from 'class-transformer';
import {
  IsString,
  MinLength,
  IsNotEmpty,
  IsArray,
  ValidateNested,
} from 'class-validator';

class SubjectProps {
  @IsString({ message: 'Informe uma disciplina válida.' })
  @MinLength(3, { message: 'A disciplina deve ter no mínimo 3 caracteres.' })
  @IsNotEmpty({ message: 'Uma disciplina deve ser informada.' })
  name: string;

  @IsString({ message: 'Informe um ID válio.' })
  @IsNotEmpty({ message: 'ID do aluno não informado.' })
  studentId: string;
}

export class CreateSubjectDto {
  @IsString({ message: 'Informe um ID válio.' })
  @IsNotEmpty({ message: 'ID do aluno não informado.' })
  studentId: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SubjectProps)
  subjects: SubjectProps[];
}

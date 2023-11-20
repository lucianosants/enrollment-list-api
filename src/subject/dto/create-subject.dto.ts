import { IsString, MinLength, IsNotEmpty } from 'class-validator';

export class CreateSubjectDto {
  @IsString({ message: 'Informe uma disciplina válida.' })
  @MinLength(3, { message: 'A disciplina deve ter no mínimo 3 caracteres.' })
  @IsNotEmpty({ message: 'Uma disciplina deve ser informada.' })
  name: string;
}

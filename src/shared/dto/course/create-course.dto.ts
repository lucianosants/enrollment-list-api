import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateCourseDto {
  @IsString({ message: 'Informe um nome válido.' })
  @MinLength(3, { message: 'O nome deve ter no mínimo 3 caracteres.' })
  @IsNotEmpty({ message: 'Nome deve ser informado.' })
  name: string;
}

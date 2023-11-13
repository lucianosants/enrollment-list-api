import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';

enum StatusRole {
  Pending,
  Approved,
  Rejected,
}

export class CreateStudentDto {
  @IsString({ message: 'Campo nome é inválido.' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  @MinLength(3, { message: 'Nome precisa ter no mínimo 3 caracteres.' })
  @MaxLength(28, { message: 'Nome não pode ter mais de 35 caracteres.' })
  name: string;

  @IsNumber()
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  @Min(7, { message: 'Idade precisa ser maior que 7.' })
  @Max(90, { message: 'Por favor, informe uma idade válida.' })
  age: number;

  @IsOptional()
  @IsEnum(StatusRole, { message: 'Status não é válido.' })
  status?: 'Pending' | 'Approved' | 'Rejected';

  @IsString()
  @IsNotEmpty({ message: 'O campo curso não pode ser vazio.' })
  @MinLength(3, { message: 'Curso precisa ter no mínimo 3 caracteres.' })
  @MaxLength(20, { message: 'Curso não pode ter mais de 35 caracteres.' })
  course: string;
}

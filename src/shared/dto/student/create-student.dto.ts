import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
  MinLength,
} from 'class-validator';
import { StatusRole } from 'src/shared/models/status-role.model';

export class CreateStudentDto {
  @IsString({ message: 'Campo nome é inválido.' })
  @IsNotEmpty({ message: 'O nome não pode ser vazio.' })
  @MinLength(3, { message: 'Nome precisa ter no mínimo 3 caracteres.' })
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
  course: string;
}

import { IsInt, IsNotEmpty, IsString, MaxLength } from "class-validator";

export class CreateStudentDto {
  @IsString({ message: 'El plan de estudios debe ser texto' })
  @IsNotEmpty({ message: 'El plan de estudios es requerido' })
  @MaxLength(50, { message: 'El plan de estudios no debe exceder 50 caracteres' })
  study_plan: string;

  @IsInt({ message: 'El ID de persona debe ser un número entero' })
  @IsNotEmpty({ message: 'El ID de persona es requerido' })
  person_id: number;
}

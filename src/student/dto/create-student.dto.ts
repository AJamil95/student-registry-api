import { IsInt, IsNotEmpty, IsString, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class CreateStudentDto {
  @ApiProperty({
    description: 'Plan de estudios del estudiante',
    example: 'Ingeniería en Sistemas Computacionales',
    maxLength: 50,
    name:'plan_estudios'
  })
  @Expose({name:'plan_estudios'})
  @IsString({ message: 'El plan de estudios debe ser texto' })
  @IsNotEmpty({ message: 'El plan de estudios es requerido' })
  @MaxLength(50, { message: 'El plan de estudios no debe exceder 50 caracteres' })
  study_plan: string;

  @ApiProperty({
    description: 'ID de la persona asociada al estudiante',
    example: 1,
    type: Number,
    name:'persona_id'
  })
  @Expose({name:'persona_id'})
  @IsInt({ message: 'El ID de persona debe ser un número entero' })
  @IsNotEmpty({ message: 'El ID de persona es requerido' })
  person_id: number;
}

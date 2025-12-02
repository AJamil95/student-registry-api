import { Expose, Transform, Type } from "class-transformer";
import { ApiProperty } from "@nestjs/swagger";
import { ResponseStudentDto } from "src/student/dto/response-student.dto";

export class ResponsePersonDto {
    @ApiProperty({
        description: 'ID único de la persona',
        example: 1,
        type: Number,
        name:'ID'
    })
    @Expose({ name: "ID" })
    @Transform(({ obj }) => obj.id) 
    id: number;

    @ApiProperty({
        description: 'Apellido paterno de la persona',
        example: 'García',
        name: 'apellido_paterno'
    })
    @Expose({ name: 'apellido_paterno' })
    @Transform(({ obj }) => obj.last_name) 
    last_name: string;

    @ApiProperty({
        description: 'Apellido materno de la persona',
        example: 'López',
        name: 'apellido_materno'
    })
    @Expose({ name: 'apellido_materno' })
    @Transform(({ obj }) => obj.middle_name) 
    middle_name: string;

    @ApiProperty({
        description: 'Nombre de la persona',
        example: 'Juan',
        name: 'nombre'
    })
    @Expose({ name: 'nombre' })
    @Transform(({ obj }) => obj.first_name) 
    first_name: string;

    @ApiProperty({
        description: 'Fecha de nacimiento de la persona',
        example: '1990-05-15',
        type: String,
        name: 'fecha_nacimiento'
    })
    @Expose({ name: 'fecha_nacimiento' })
    @Transform(({ obj }) => obj.date_of_birth) 
    date_of_birth: Date;

    @ApiProperty({
        description: 'Dirección de la persona',
        example: 'Calle Principal 123, Apartamento 4B',
        name: 'direccion'
    })
    @Expose({ name: 'direccion' })
    @Transform(({ obj }) => obj.address) 
    address: string;

    @ApiProperty({
        description: 'Teléfono de contacto',
        example: '5551234567',
        name: 'telefono'
    })
    @Expose({ name: 'telefono' })
    @Transform(({ obj }) => obj.phone) 
    phone: string;

    @ApiProperty({
    description: 'Estudiantes asociados',
    type: [Object],
    name: 'estudiantes'
    })
    @Expose({ name: 'estudiantes' })
    @Transform(({ obj }) => {
        if (obj.students) {
            return obj.students.map(student => ({
                ID: student.id,
                plan_estudios: student.study_plan
            }));
        }
        return [];
    })
    students: ResponseStudentDto[];
}
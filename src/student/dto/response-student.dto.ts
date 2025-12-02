import { Expose, instanceToPlain, plainToInstance, Transform, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ResponsePersonDto } from 'src/person/dto/response-person.dto';

export class ResponseStudentDto {
    @ApiProperty({
        description: 'ID único del estudiante',
        example: 1,
        type: Number,
        name:'ID'
    })
    @Expose({name:'ID'})
    @Transform(({ obj }) => obj.id) 
    id: number;

    @ApiProperty({
        description: 'Plan de estudios del estudiante',
        example: 'Ingeniería en Sistemas Computacionales',
        name: 'plan_estudios'
    })
    @Expose({ name: 'plan_estudios' })
    @Transform(({ obj }) => obj.study_plan)
    study_plan: string;

    @ApiProperty({
        description: 'Información de la persona asociada al estudiante',
        type: ResponsePersonDto,
        name: 'persona'
    })
    @Expose({ name: 'persona' })  
    @Type(() => ResponsePersonDto) 
    person: ResponsePersonDto;
}
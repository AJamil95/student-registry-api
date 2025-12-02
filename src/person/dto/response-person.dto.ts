import { Type } from "class-transformer";
import { ResponseStudentDto } from "src/student/dto/response-student.dto";

export class ResponsePersonDto {
    id: number;

    last_name: string;

    middle_name: string;

    first_name: string;

    date_of_birth: Date;

    address: string;

    phone: string;

    @Type(() => ResponseStudentDto) 
    students: ResponseStudentDto[];
}
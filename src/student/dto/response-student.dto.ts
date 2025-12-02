import { Expose } from 'class-transformer';

export class ResponseStudentDto {
    @Expose()
    id: number;

    @Expose()
    study_plan: string;
}
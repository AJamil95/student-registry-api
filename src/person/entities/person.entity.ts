import { Student } from 'src/student/entities/student.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Person {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({type:'varchar',length:100})
    last_name:string;
    @Column({type:'varchar',length:100})
    middle_name:string;
    @Column({type:'varchar',length:100})
    first_name:string;
    @Column({ type: 'date' })
    date_of_birth:Date;
    @Column({type:'varchar',length:255})
    address:string;
    @Column({type:'varchar',length:20})
    phone:string;

    @OneToMany(()=>Student, student => student.person)
    students: Student[];
}

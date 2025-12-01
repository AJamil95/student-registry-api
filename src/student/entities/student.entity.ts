import { Person } from "src/person/entities/person.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Student {
    @PrimaryGeneratedColumn()
    id:number;
    @Column({type:'varchar',length:50})
    study_plan:string

    @ManyToOne(()=>Person, person=> person.students,{eager:true})
    @JoinColumn({name:'person_id'})
    person:Person;
}

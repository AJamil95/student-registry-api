import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { Person } from 'src/person/entities/person.entity';

@Injectable()
export class StudentService {

  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ){}

  async create(createStudentDto: CreateStudentDto): Promise<Student> {
    const person = await this.personRepository.findOne({
      where: { id: createStudentDto.person_id }
    });

    if (!person) {
      throw new Error(`Persona con ID ${createStudentDto.person_id} no encontrada`);
    }

    const student = this.studentRepository.create({
      study_plan: createStudentDto.study_plan,
      person: person
    });

    return await this.studentRepository.save(student);
  }

  async findAll(): Promise<Student[]> {
    return await this.studentRepository.find();
  }

  async findOne(id: number): Promise<Student> {
    const student = await this.studentRepository.findOne({ 
      where: { id },
      relations: ['person']
    });
    
    if (!student) {
      throw new Error(`Estudiante con ID ${id} no encontrado`);
    }
    
    return student;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto): Promise<Student> {
    const student = await this.findOne(id);
    
    if (updateStudentDto.person_id) {
      const person = await this.personRepository.findOne({
        where: { id: updateStudentDto.person_id }
      });
      
      if (!person) {
        throw new Error(`Persona con ID ${updateStudentDto.person_id} no encontrada`);
      }
      
      student.person = person;
    }
    
    if (updateStudentDto.study_plan) {
      student.study_plan = updateStudentDto.study_plan;
    }
    
    return await this.studentRepository.save(student);
  }

  async remove(id: number): Promise<void> {
    const result = await this.studentRepository.delete(id);
    
    if (result.affected === 0) {
      throw new Error(`Estudiante con ID ${id} no encontrado`);
    }
  }
}

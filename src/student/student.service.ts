import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { Person } from 'src/person/entities/person.entity';
import { ResponseStudentDto } from './dto/response-student.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class StudentService {

  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ){}

  async create(createStudentDto: CreateStudentDto): Promise<ResponseStudentDto>{
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

    const newStudent = await this.studentRepository.save(student);
    return plainToInstance(ResponseStudentDto,newStudent);
  }

  async findAll(): Promise<ResponseStudentDto[]> {
    const students = await this.studentRepository.find();
    return plainToInstance(ResponseStudentDto,students);
  }

  async findOne(id: number): Promise<ResponseStudentDto> {
    const student = await this.studentRepository.findOne({ 
      where: { id },
      relations: ['person']
    });
    
    if (!student) {
      throw new Error(`Estudiante con ID ${id} no encontrado`);
    }
    
    return plainToInstance(ResponseStudentDto,student);
  }

  async update(id: number, updateStudentDto: UpdateStudentDto): Promise<ResponseStudentDto> {
    const student = await this.studentRepository.findOne(
      { 
        where: { id },
        relations: ['person']
      }
    );
    if (!student) {
        throw new Error(`Estudiante con ID ${id} no encontrado`);
    }
    
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
    
    const updatedStudent = await this.studentRepository.save(student);
    return plainToInstance(ResponseStudentDto,updatedStudent);
  }

  async remove(id: number): Promise<void> {
    const result = await this.studentRepository.delete(id);
    
    if (result.affected === 0) {
      throw new Error(`Estudiante con ID ${id} no encontrado`);
    }
  }
}

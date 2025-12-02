import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Repository } from 'typeorm';
import { Person } from 'src/person/entities/person.entity';
import { ResponseStudentDto } from './dto/response-student.dto';
import { plainToInstance, classToPlain, instanceToPlain } from 'class-transformer';
import { ResponsePersonDto } from 'src/person/dto/response-person.dto';

@Injectable()
export class StudentService {

  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
    @InjectRepository(Person)
    private readonly personRepository: Repository<Person>,
  ){}

  async create(createStudentDto: CreateStudentDto): Promise<any>{
    const person = await this.personRepository.findOne({
      where: { id: createStudentDto.person_id }
    });

    if (!person) {
      throw new NotFoundException(`Persona con ID ${createStudentDto.person_id} no encontrada`);
    }

    const student = this.studentRepository.create({
      study_plan: createStudentDto.study_plan,
      person: person
    });

    await this.studentRepository.save(student);
    const newStudent = await this.studentRepository.findOne({
        where: { id: student.id },
        relations: ['person'] 
    });
    if (!newStudent) {
        throw new Error('Error al crear el estudiante');
    }
    const plainStudent = instanceToPlain(newStudent);
    
    const studentDto = plainToInstance(ResponseStudentDto, {
        id: plainStudent.id,
        study_plan: plainStudent.study_plan,
        person: plainStudent.person
    });
    
    if (plainStudent.person) {
        const personDto = plainToInstance(ResponsePersonDto, plainStudent.person);
        studentDto.person = personDto;
    }
    
    return instanceToPlain(studentDto) as ResponseStudentDto;
  }

  async findAll(): Promise<ResponseStudentDto[]> {
      const students = await this.studentRepository.find({
          relations: ['person']
      });
      const plainStudents = instanceToPlain(students);
      
      const result = plainStudents.map(plainStudent => {
          const studentDto = plainToInstance(ResponseStudentDto, {
              id: plainStudent.id,
              study_plan: plainStudent.study_plan,
              person: plainStudent.person
          });
          
          if (plainStudent.person) {
              const personDto = plainToInstance(ResponsePersonDto, plainStudent.person, {
                  excludeExtraneousValues: true
              });
              studentDto.person = personDto;
          }
          
          return instanceToPlain(studentDto);
      });

      return result as ResponseStudentDto[];
  }

  async findOne(id: number): Promise<ResponseStudentDto> {
      const student = await this.studentRepository.findOne({ 
          where: { id },
          relations: ['person']
      });
      
      if (!student) {
          throw new NotFoundException(`Estudiante con ID ${id} no encontrado`);
      }
      
      const plainStudent = instanceToPlain(student);
      
      const studentDto = plainToInstance(ResponseStudentDto, {
          id: plainStudent.id,
          study_plan: plainStudent.study_plan,
          person: plainStudent.person
      });
      
      if (plainStudent.person) {
          const personDto = plainToInstance(ResponsePersonDto, plainStudent.person);
          studentDto.person = personDto;
      }
      
      return instanceToPlain(studentDto) as ResponseStudentDto;
  }

  async update(id: number, updateStudentDto: UpdateStudentDto): Promise<any> {
    const student = await this.studentRepository.findOne(
      { 
        where: { id },
        relations: ['person']
      }
    );
    if (!student) {
        throw new NotFoundException(`Estudiante con ID ${id} no encontrado`);
    }
    
    if (updateStudentDto.person_id) {
      const person = await this.personRepository.findOne({
        where: { id: updateStudentDto.person_id }
      });
      
      if (!person) {
        throw new NotFoundException(`Persona con ID ${updateStudentDto.person_id} no encontrada`);
      }
      
      student.person = person;
    }
    
    if (updateStudentDto.study_plan) {
      student.study_plan = updateStudentDto.study_plan;
    }
    
    await this.studentRepository.save(student);

    const updatedStudent = await this.studentRepository.findOne({
        where: { id: student.id },
        relations: ['person'] 
    });
    if (!updatedStudent) {
        throw new NotFoundException(`Estudiante con ID ${id} no encontrado`);
    }
    const plainStudent = instanceToPlain(updatedStudent);
    
    const studentDto = plainToInstance(ResponseStudentDto, {
        id: plainStudent.id,
        study_plan: plainStudent.study_plan,
        person: plainStudent.person
    });
    
    if (plainStudent.person) {
        const personDto = plainToInstance(ResponsePersonDto, plainStudent.person);
        studentDto.person = personDto;
    }
    
    return instanceToPlain(studentDto) as ResponseStudentDto;
  }

  async remove(id: number): Promise<void> {
    const result = await this.studentRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Estudiante con ID ${id} no encontrado`);
    }
  }
}

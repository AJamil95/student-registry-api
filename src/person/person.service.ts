import { Injectable, NotFoundException } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { ResponsePersonDto } from './dto/response-person.dto';
import { Person } from './entities/person.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance, instanceToPlain } from 'class-transformer';

@Injectable()
export class PersonService {

  constructor(
    @InjectRepository(Person) 
    private readonly personRepository: Repository<Person>
  )
  {}
  
  async create(createPersonDto: CreatePersonDto): Promise<ResponsePersonDto> {
    const newPerson = this.personRepository.create({
      ...createPersonDto,
      middle_name: createPersonDto.middle_name ?? '',
      address: createPersonDto.address ?? '',
      phone: createPersonDto.phone ?? ''
      });
    const savedPerson = await this.personRepository.save(newPerson)
    const instance = plainToInstance(ResponsePersonDto, savedPerson);
    return instanceToPlain(instance) as ResponsePersonDto;
  }

  async findAll(): Promise<ResponsePersonDto[]> {
    const people = await this.personRepository.find({
        relations: ['students']
    });

    const plainPeople = instanceToPlain(people);
    
    const result = plainPeople.map(plainPerson => {
        // 1. Primero obtener la persona básica
        const personDto = plainToInstance(ResponsePersonDto, {
            id: plainPerson.id,
            last_name: plainPerson.last_name,
            middle_name: plainPerson.middle_name,
            first_name: plainPerson.first_name,
            date_of_birth: plainPerson.date_of_birth,
            address: plainPerson.address,
            phone: plainPerson.phone
        }, {
            excludeExtraneousValues: true
        });
        
        // 2. Ahora manejar estudiantes SEPARADAMENTE
        let estudiantes = [];
        if (plainPerson.students && plainPerson.students.length > 0) {
            // Convertir cada estudiante a objeto plano primero
            estudiantes = plainPerson.students.map(student => {
                const plainStudent = instanceToPlain(student);
                return {
                    ID: plainStudent.id,
                    plan_estudios: plainStudent.study_plan
                };
            });
        }
        
        // 3. Convertir persona a objeto plano
        const response = instanceToPlain(personDto);
        
        // 4. Agregar estudiantes MANUALMENTE al objeto de respuesta
        response.estudiantes = estudiantes;
        
        return response;
    });

    return result as ResponsePersonDto[];
}

  async findOne(id: number): Promise<ResponsePersonDto> {
    const person = await this.personRepository.findOne({
        where: { id },
        relations: ['students']
    });

    if (!person) {
        throw new NotFoundException(`Persona con ID ${id} no encontrada`);
    }

    const plainPerson = instanceToPlain(person);
    
    // Transformar persona básica
    const personDto = plainToInstance(ResponsePersonDto, {
        id: plainPerson.id,
        last_name: plainPerson.last_name,
        middle_name: plainPerson.middle_name,
        first_name: plainPerson.first_name,
        date_of_birth: plainPerson.date_of_birth,
        address: plainPerson.address,
        phone: plainPerson.phone
    }, {
        excludeExtraneousValues: true
    });
    
    const response = instanceToPlain(personDto) as any;
    
    // Agregar estudiantes
    if (plainPerson.students && plainPerson.students.length > 0) {
        response.estudiantes = plainPerson.students.map(student => {
            const plainStudent = instanceToPlain(student);
            return {
                ID: plainStudent.id,
                plan_estudios: plainStudent.study_plan
            };
        });
    } else {
        response.estudiantes = [];
    }
    
    return response;
}

  async update(id: number, updatePersonDto: UpdatePersonDto): Promise<ResponsePersonDto> {
    const personToUpdate = await this.personRepository.preload({
      id,
      ...updatePersonDto,
    });
    
    if (!personToUpdate) {
      throw new NotFoundException(`Persona con ID ${id} no encontrada. No se actualizó nada`);
    }
    
    const updatePerson = await this.personRepository.save(personToUpdate);
    const instance = plainToInstance(ResponsePersonDto, updatePerson);
    return instanceToPlain(instance) as ResponsePersonDto;
  }

  async remove(id: number): Promise<void> {
    const result = await this.personRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Persona con ID ${id} no encontrada. No se eliminó nada`);
    }
  }
}

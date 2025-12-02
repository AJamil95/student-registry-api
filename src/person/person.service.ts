import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { ResponsePersonDto } from './dto/response-person.dto';
import { Person } from './entities/person.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

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
    return plainToInstance(ResponsePersonDto,savedPerson);
  }

  async findAll(): Promise<ResponsePersonDto[]> {
    const people = await this.personRepository.find();
    return plainToInstance(ResponsePersonDto,people);
  }

  async findOne(id: number): Promise<ResponsePersonDto> {
    const person = await this.personRepository.findOne({ where: { id } });
    
    if (!person) {
      throw new Error(`Persona con ID ${id} no encontrada`);
    }
    
    return person;
  }

  async update(id: number, updatePersonDto: UpdatePersonDto): Promise<ResponsePersonDto> {
    const personToUpdate = await this.personRepository.preload({
      id,
      ...updatePersonDto,
    });
    
    if (!personToUpdate) {
      throw new Error(`Persona con ID ${id} no encontrada. No se actualizó nada`);
    }
    
    const updatePerson = await this.personRepository.save(personToUpdate);
    return plainToInstance(ResponsePersonDto,updatePerson);
  }

  async remove(id: number): Promise<void> {
    const result = await this.personRepository.delete(id);
    
    if (result.affected === 0) {
      throw new Error(`Persona con ID ${id} no encontrada. No se eliminó nada`);
    }
  }
}

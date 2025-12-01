import { Injectable } from '@nestjs/common';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { Person } from './entities/person.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class PersonService {

  constructor(
    @InjectRepository(Person) 
    private readonly personRepository: Repository<Person>
  )
  {}
  
  async create(createPersonDto: CreatePersonDto): Promise<Person> {
    const newPerson = this.personRepository.create({
      ...createPersonDto,
      middle_name: createPersonDto.middle_name ?? '',
      address: createPersonDto.address ?? '',
      phone: createPersonDto.phone ?? ''
      });
    return await this.personRepository.save(newPerson)
  }

  async findAll(): Promise<Person[]> {
    return await this.personRepository.find();
  }

  async findOne(id: number): Promise<Person> {
    const person = await this.personRepository.findOne({ where: { id } });
    
    if (!person) {
      throw new Error(`Persona con ID ${id} no encontrada`);
    }
    
    return person;
  }

  async update(id: number, updatePersonDto: UpdatePersonDto): Promise<Person> {
    const personToUpdate = await this.personRepository.preload({
      id,
      ...updatePersonDto,
    });
    
    if (!personToUpdate) {
      throw new Error(`Persona con ID ${id} no encontrada. No se actualizó nada`);
    }
    
    return await this.personRepository.save(personToUpdate);
  }

  async remove(id: number): Promise<void> {
    const result = await this.personRepository.delete(id);
    
    if (result.affected === 0) {
      throw new Error(`Persona con ID ${id} no encontrada. No se eliminó nada`);
    }
  }
}

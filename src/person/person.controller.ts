import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { ResponsePersonDto } from './dto/response-person.dto';

@Controller('api/v1/person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  async create(@Body() createPersonDto: CreatePersonDto):Promise<ResponsePersonDto> {
    return await this.personService.create(createPersonDto);
  }

  @Get()
  async findAll():Promise<ResponsePersonDto[]> {
    return await this.personService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponsePersonDto> {
    return await this.personService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto): Promise<ResponsePersonDto> {
    return await this.personService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.personService.remove(+id);
  }
}

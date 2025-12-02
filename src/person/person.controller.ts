import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { PersonService } from './person.service';
import { CreatePersonDto } from './dto/create-person.dto';
import { UpdatePersonDto } from './dto/update-person.dto';
import { ResponsePersonDto } from './dto/response-person.dto';

@ApiTags('Personas')
@Controller('api/v1/person')
export class PersonController {
  constructor(private readonly personService: PersonService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear una nueva persona',
    description: 'Crea un nuevo registro de persona con sus datos básicos',
  })
  @ApiBody({
    type: CreatePersonDto,
    examples: {
      example1: {
        summary: 'Persona completa',
        description: 'Ejemplo con todos los campos incluyendo opcionales',
        value: {
          apellido_paterno: 'García',
          apellido_materno: 'López',
          nombre: 'Juan',
          fecha_nacimiento: '1990-05-15',
          direccion: 'Calle Principal 123, Apartamento 4B',
          telefono: '5551234567',
        },
      },
      example2: {
        summary: 'Persona sin datos opcionales',
        description: 'Ejemplo solo con campos requeridos',
        value: {
          apellido_paterno: 'Rodríguez',
          nombre: 'María',
          fecha_nacimiento: '1995-03-20',
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Persona creada exitosamente',
    type: ResponsePersonDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos en la solicitud',
  })
  async create(@Body() createPersonDto: CreatePersonDto): Promise<ResponsePersonDto> {
    return await this.personService.create(createPersonDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todas las personas',
    description: 'Retorna un listado de todas las personas registradas en el sistema',
  })
  @ApiResponse({
    status: 200,
    description: 'Listado de personas obtenido exitosamente',
    type: [ResponsePersonDto],
  })
  async findAll(): Promise<ResponsePersonDto[]> {
    return await this.personService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener persona por ID',
    description: 'Retorna los datos de una persona específica junto con sus estudiantes asociados',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único de la persona',
    example: 1,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Persona encontrada exitosamente',
    type: ResponsePersonDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Persona no encontrada',
  })
  async findOne(@Param('id') id: string): Promise<ResponsePersonDto> {
    return await this.personService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar datos de una persona',
    description: 'Actualiza los datos de una persona existente. Todos los campos son opcionales.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único de la persona a actualizar',
    example: 1,
    type: Number,
  })
  @ApiBody({
    type: UpdatePersonDto,
    examples: {
      example1: {
        summary: 'Actualizar solo nombre',
        value: {
          nombre: 'Carlos',
        },
      },
      example2: {
        summary: 'Actualizar múltiples campos',
        value: {
          nombre: 'Carlos',
          telefono: '5559876543',
          direccion: 'Avenida Secundaria 456',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Persona actualizada exitosamente',
    type: ResponsePersonDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Persona no encontrada',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos en la solicitud',
  })
  async update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto): Promise<ResponsePersonDto> {
    return await this.personService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar una persona',
    description: 'Elimina un registro de persona del sistema. Nota: Esta operación es irreversible.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único de la persona a eliminar',
    example: 1,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Persona eliminada exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Persona no encontrada',
  })
  async remove(@Param('id') id: string): Promise<void> {
    return await this.personService.remove(+id);
  }
}

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
    description: 'Crea un nuevo registro de persona con sus datos básicos. Los campos apellido_paterno, nombre y fecha_nacimiento son requeridos. El apellido_materno, dirección y teléfono son opcionales.',
  })
  @ApiBody({
    type: CreatePersonDto,
    description: 'Datos de la persona a crear',
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
    schema: {
      example: {
        ID: 1,
        apellido_paterno: 'García',
        apellido_materno: 'López',
        nombre: 'Juan',
        fecha_nacimiento: '1990-05-15',
        direccion: 'Calle Principal 123, Apartamento 4B',
        telefono: '5551234567',
        estudiantes: []
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos: campos requeridos faltantes, formato inválido de fecha (debe ser YYYY-MM-DD), caracteres no permitidos en nombres/apellidos, o longitud de campos excedida',
  })
  async create(@Body() createPersonDto: CreatePersonDto): Promise<ResponsePersonDto> {
    return await this.personService.create(createPersonDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todas las personas',
    description: 'Retorna un listado completo de todas las personas registradas en el sistema, incluyendo sus estudiantes asociados',
  })
  @ApiResponse({
    status: 200,
    description: 'Listado de personas obtenido exitosamente',
    type: [ResponsePersonDto],
    schema: {
      example: [
        {
          ID: 1,
          apellido_paterno: 'García',
          apellido_materno: 'López',
          nombre: 'Juan',
          fecha_nacimiento: '1990-05-15',
          direccion: 'Calle Principal 123',
          telefono: '5551234567',
          estudiantes: [
            { ID: 1, plan_estudios: 'Ingeniería en Sistemas' }
          ]
        }
      ]
    }
  })
  async findAll(): Promise<ResponsePersonDto[]> {
    return await this.personService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener persona por ID',
    description: 'Retorna los datos de una persona específica junto con el listado de todos sus estudiantes asociados',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único de la persona a recuperar',
    example: 1,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Persona encontrada exitosamente',
    type: ResponsePersonDto,
    schema: {
      example: {
        ID: 1,
        apellido_paterno: 'García',
        apellido_materno: 'López',
        nombre: 'Juan',
        fecha_nacimiento: '1990-05-15',
        direccion: 'Calle Principal 123',
        telefono: '5551234567',
        estudiantes: [
          { ID: 1, plan_estudios: 'Ingeniería en Sistemas Computacionales' },
          { ID: 2, plan_estudios: 'Maestría en Ciencia de Datos' }
        ]
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'Persona no encontrada con el ID proporcionado',
  })
  async findOne(@Param('id') id: string): Promise<ResponsePersonDto> {
    return await this.personService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar datos de una persona',
    description: 'Actualiza parcialmente los datos de una persona existente. Todos los campos son opcionales, solo se actualizan los campos proporcionados en la solicitud.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único de la persona a actualizar',
    example: 1,
    type: Number,
  })
  @ApiBody({
    type: UpdatePersonDto,
    description: 'Datos parciales de la persona a actualizar (todos los campos son opcionales)',
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
      example3: {
        summary: 'Actualizar información de contacto',
        value: {
          telefono: '5555555555',
          direccion: 'Nueva dirección 789, Piso 5A',
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Persona actualizada exitosamente',
    type: ResponsePersonDto,
    schema: {
      example: {
        ID: 1,
        apellido_paterno: 'García',
        apellido_materno: 'López',
        nombre: 'Carlos',
        fecha_nacimiento: '1990-05-15',
        direccion: 'Avenida Secundaria 456',
        telefono: '5559876543',
        estudiantes: []
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'Persona no encontrada con el ID proporcionado',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos: formato de fecha incorrecto, caracteres no permitidos en nombres/apellidos, números en campos de texto, o longitud de campos excedida',
  })
  async update(@Param('id') id: string, @Body() updatePersonDto: UpdatePersonDto): Promise<ResponsePersonDto> {
    return await this.personService.update(+id, updatePersonDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar una persona',
    description: 'Elimina un registro de persona del sistema permanentemente. Advertencia: Esta operación es irreversible y también eliminará todos los registros de estudiantes asociados a esta persona.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único de la persona a eliminar',
    example: 1,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Persona eliminada exitosamente. Si la persona tenía estudiantes asociados, estos también fueron eliminados.',
  })
  @ApiResponse({
    status: 404,
    description: 'Persona no encontrada con el ID proporcionado. No se realizó ninguna operación de eliminación.',
  })
  async remove(@Param('id') id: string): Promise<void> {
    return await this.personService.remove(+id);
  }
}

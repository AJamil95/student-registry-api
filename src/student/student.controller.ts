import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiBody } from '@nestjs/swagger';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ResponseStudentDto } from './dto/response-student.dto';

@ApiTags('Estudiantes')
@Controller('api/v1/student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  @ApiOperation({
    summary: 'Crear un nuevo estudiante',
    description: 'Crea un nuevo registro de estudiante asociándolo con una persona existente. La persona debe existir previamente en el sistema.',
  })
  @ApiBody({
    type: CreateStudentDto,
    description: 'Datos del estudiante a crear',
    examples: {
      example1: {
        summary: 'Nuevo estudiante de Ingeniería',
        description: 'Ejemplo de creación de estudiante con plan de estudios de Ingeniería',
        value: {
          plan_estudios: 'Ingeniería en Sistemas Computacionales',
          persona_id: 1,
        },
      },
      example2: {
        summary: 'Estudiante de Administración',
        value: {
          plan_estudios: 'Licenciatura en Administración',
          persona_id: 2,
        },
      },
      example3: {
        summary: 'Estudiante de Posgrado',
        value: {
          plan_estudios: 'Maestría en Ciencia de Datos',
          persona_id: 3,
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Estudiante creado exitosamente',
    type: ResponseStudentDto,
    schema: {
      example: {
        ID: 1,
        plan_estudios: 'Ingeniería en Sistemas Computacionales',
        persona: {
          ID: 1,
          apellido_paterno: 'García',
          apellido_materno: 'López',
          nombre: 'Juan',
          fecha_nacimiento: '1990-05-15',
          direccion: 'Calle Principal 123',
          telefono: '5551234567',
          estudiantes: []
        }
      }
    }
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos: plan de estudios vacío, persona_id no es un número entero, campos requeridos faltantes, o longitud del plan de estudios excedida',
  })
  @ApiResponse({
    status: 404,
    description: 'Persona no encontrada: el persona_id proporcionado no existe en el sistema',
  })
  async create(@Body() createStudentDto: CreateStudentDto): Promise<ResponseStudentDto> {
    return await this.studentService.create(createStudentDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los estudiantes',
    description: 'Retorna un listado completo de todos los estudiantes registrados en el sistema, incluyendo los datos de la persona asociada a cada estudiante',
  })
  @ApiResponse({
    status: 200,
    description: 'Listado de estudiantes obtenido exitosamente',
    type: [ResponseStudentDto],
    schema: {
      example: [
        {
          ID: 1,
          plan_estudios: 'Ingeniería en Sistemas Computacionales',
          persona: {
            ID: 1,
            apellido_paterno: 'García',
            apellido_materno: 'López',
            nombre: 'Juan',
            fecha_nacimiento: '1990-05-15',
            direccion: 'Calle Principal 123',
            telefono: '5551234567',
            estudiantes: []
          }
        },
        {
          ID: 2,
          plan_estudios: 'Licenciatura en Administración',
          persona: {
            ID: 2,
            apellido_paterno: 'Rodríguez',
            apellido_materno: 'García',
            nombre: 'María',
            fecha_nacimiento: '1995-03-20',
            direccion: 'Avenida Secundaria 456',
            telefono: '5559876543',
            estudiantes: []
          }
        }
      ]
    }
  })
  async findAll(): Promise<ResponseStudentDto[]> {
    return await this.studentService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener estudiante por ID',
    description: 'Retorna los datos de un estudiante específico, incluyendo toda la información de la persona asociada',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único del estudiante a recuperar',
    example: 1,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Estudiante encontrado exitosamente',
    type: ResponseStudentDto,
    schema: {
      example: {
        ID: 1,
        plan_estudios: 'Ingeniería en Sistemas Computacionales',
        persona: {
          ID: 1,
          apellido_paterno: 'García',
          apellido_materno: 'López',
          nombre: 'Juan',
          fecha_nacimiento: '1990-05-15',
          direccion: 'Calle Principal 123',
          telefono: '5551234567',
          estudiantes: [
            { ID: 1, plan_estudios: 'Ingeniería en Sistemas Computacionales' }
          ]
        }
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'Estudiante no encontrado con el ID proporcionado',
  })
  async findOne(@Param('id') id: string): Promise<ResponseStudentDto> {
    return await this.studentService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar datos de un estudiante',
    description: 'Actualiza parcialmente los datos de un estudiante existente. Todos los campos son opcionales. Si se proporciona un nuevo persona_id, la persona debe existir en el sistema.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único del estudiante a actualizar',
    example: 1,
    type: Number,
  })
  @ApiBody({
    type: UpdateStudentDto,
    description: 'Datos parciales del estudiante a actualizar (todos los campos son opcionales)',
    examples: {
      example1: {
        summary: 'Cambiar plan de estudios',
        value: {
          plan_estudios: 'Maestría en Ciencia de Datos',
        },
      },
      example2: {
        summary: 'Reasignar a otra persona',
        value: {
          persona_id: 3,
        },
      },
      example3: {
        summary: 'Cambiar plan y persona',
        value: {
          plan_estudios: 'Doctorado en Informática',
          persona_id: 5,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Estudiante actualizado exitosamente',
    type: ResponseStudentDto,
    schema: {
      example: {
        ID: 1,
        plan_estudios: 'Maestría en Ciencia de Datos',
        persona: {
          ID: 1,
          apellido_paterno: 'García',
          apellido_materno: 'López',
          nombre: 'Juan',
          fecha_nacimiento: '1990-05-15',
          direccion: 'Calle Principal 123',
          telefono: '5551234567',
          estudiantes: []
        }
      }
    }
  })
  @ApiResponse({
    status: 404,
    description: 'Estudiante no encontrado, o la persona con el persona_id proporcionado no existe',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos: persona_id no es un número entero, longitud del plan de estudios excedida, o caracteres no válidos',
  })
  async update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto): Promise<ResponseStudentDto> {
    return await this.studentService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un estudiante',
    description: 'Elimina un registro de estudiante del sistema permanentemente. Nota: La persona asociada al estudiante NO será eliminada, solo el registro del estudiante.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único del estudiante a eliminar',
    example: 1,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Estudiante eliminado exitosamente. La persona asociada permanece en el sistema.',
  })
  @ApiResponse({
    status: 404,
    description: 'Estudiante no encontrado con el ID proporcionado. No se realizó ninguna operación de eliminación.',
  })
  async remove(@Param('id') id: string): Promise<void> {
    return await this.studentService.remove(+id);
  }
}

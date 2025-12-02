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
    description: 'Crea un nuevo registro de estudiante asociándolo con una persona existente',
  })
  @ApiBody({
    type: CreateStudentDto,
    examples: {
      example1: {
        summary: 'Nuevo estudiante',
        description: 'Ejemplo de creación de estudiante con plan de estudios',
        value: {
          study_plan: 'Ingeniería en Sistemas Computacionales',
          person_id: 1,
        },
      },
      example2: {
        summary: 'Otro programa',
        value: {
          study_plan: 'Licenciatura en Administración',
          person_id: 2,
        },
      },
    },
  })
  @ApiResponse({
    status: 201,
    description: 'Estudiante creado exitosamente',
    type: ResponseStudentDto,
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos en la solicitud',
  })
  @ApiResponse({
    status: 404,
    description: 'Persona no encontrada',
  })
  async create(@Body() createStudentDto: CreateStudentDto): Promise<ResponseStudentDto> {
    return await this.studentService.create(createStudentDto);
  }

  @Get()
  @ApiOperation({
    summary: 'Obtener todos los estudiantes',
    description: 'Retorna un listado de todos los estudiantes registrados en el sistema',
  })
  @ApiResponse({
    status: 200,
    description: 'Listado de estudiantes obtenido exitosamente',
    type: [ResponseStudentDto],
  })
  async findAll(): Promise<ResponseStudentDto[]> {
    return await this.studentService.findAll();
  }

  @Get(':id')
  @ApiOperation({
    summary: 'Obtener estudiante por ID',
    description: 'Retorna los datos de un estudiante específico',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único del estudiante',
    example: 1,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Estudiante encontrado exitosamente',
    type: ResponseStudentDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Estudiante no encontrado',
  })
  async findOne(@Param('id') id: string): Promise<ResponseStudentDto> {
    return await this.studentService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({
    summary: 'Actualizar datos de un estudiante',
    description: 'Actualiza los datos de un estudiante existente. Todos los campos son opcionales.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único del estudiante a actualizar',
    example: 1,
    type: Number,
  })
  @ApiBody({
    type: UpdateStudentDto,
    examples: {
      example1: {
        summary: 'Cambiar plan de estudios',
        value: {
          study_plan: 'Maestría en Ciencia de Datos',
        },
      },
      example2: {
        summary: 'Reasignar a otra persona',
        value: {
          person_id: 3,
        },
      },
    },
  })
  @ApiResponse({
    status: 200,
    description: 'Estudiante actualizado exitosamente',
    type: ResponseStudentDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Estudiante no encontrado',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos inválidos en la solicitud',
  })
  async update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto): Promise<ResponseStudentDto> {
    return await this.studentService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  @ApiOperation({
    summary: 'Eliminar un estudiante',
    description: 'Elimina un registro de estudiante del sistema. Nota: Esta operación es irreversible.',
  })
  @ApiParam({
    name: 'id',
    description: 'ID único del estudiante a eliminar',
    example: 1,
    type: Number,
  })
  @ApiResponse({
    status: 200,
    description: 'Estudiante eliminado exitosamente',
  })
  @ApiResponse({
    status: 404,
    description: 'Estudiante no encontrado',
  })
  async remove(@Param('id') id: string): Promise<void> {
    return await this.studentService.remove(+id);
  }
}

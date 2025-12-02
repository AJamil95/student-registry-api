import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StudentService } from './student.service';
import { CreateStudentDto } from './dto/create-student.dto';
import { UpdateStudentDto } from './dto/update-student.dto';
import { ResponseStudentDto } from './dto/response-student.dto';

@Controller('api/v1/student')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Post()
  async create(@Body() createStudentDto: CreateStudentDto): Promise<ResponseStudentDto> {
    return await this.studentService.create(createStudentDto);
  }

  @Get()
  async findAll(): Promise<ResponseStudentDto[]> {
    return await this.studentService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ResponseStudentDto> {
    return await this.studentService.findOne(+id);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateStudentDto: UpdateStudentDto): Promise<ResponseStudentDto> {
    return await this.studentService.update(+id, updateStudentDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    return await this.studentService.remove(+id);
  }
}

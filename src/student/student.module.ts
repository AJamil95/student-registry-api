import { Module } from '@nestjs/common';
import { StudentService } from './student.service';
import { StudentController } from './student.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Student } from './entities/student.entity';
import { Person } from 'src/person/entities/person.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Student,Person])],
  controllers: [StudentController],
  providers: [StudentService],
})
export class StudentModule {}

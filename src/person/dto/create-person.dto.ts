import { IsNotEmpty, IsOptional, IsString, Matches, MaxLength } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class CreatePersonDto {
  @ApiProperty({
    description: 'Apellido paterno de la persona',
    example: 'García',
    maxLength: 100,
    name:'apellido_paterno'
  })
  @Expose({name:'apellido_paterno'})
  @IsString({ message: 'El apellido paterno debe ser texto' })
  @IsNotEmpty({ message: 'El apellido paterno es requerido' })
  @MaxLength(100, { message: 'El apellido paterno no debe exceder 100 caracteres' })
  @Matches(/^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/, { 
    message: 'El apellido paterno solo puede contener letras y espacios' 
  })
  last_name: string;

  @ApiProperty({
    description: 'Apellido materno de la persona',
    example: 'López',
    maxLength: 100,
    required: false,
    name: 'apellido_materno'
  })
  @Expose({name: 'apellido_materno'})
  @IsOptional()
  @IsString({ message: 'El apellido materno debe ser texto' })
  @MaxLength(100, { message: 'El apellido materno no debe exceder 100 caracteres' })
  @Matches(/^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]*$/, { 
    message: 'El apellido materno solo puede contener letras y espacios' 
  })
  middle_name?: string;

  @ApiProperty({
    description: 'Nombre de la persona',
    example: 'Juan',
    maxLength: 100,
    name:'nombre'
  })
  @Expose({name:'nombre'})
  @IsString({ message: 'El nombre deben ser texto' })
  @IsNotEmpty({ message: 'EL nombre es requerido' })
  @MaxLength(100, { message: 'El nombre no debe exceder 100 caracteres' })
  @Matches(/^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/, { 
    message: 'El nombre solo puede contener letras y espacios' 
  })
  first_name: string;
  
  @ApiProperty({
    description: 'Fecha de nacimiento en formato YYYY-MM-DD',
    example: '1990-05-15',
    pattern: '^\\d{4}-\\d{2}-\\d{2}$',
    name:'fecha_nacimiento'
  })
  @Expose({name:'fecha_nacimiento'})
  @IsNotEmpty({ message: 'La fecha de nacimiento es requerida' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { 
    message: 'La fecha de nacimiento debe tener formato YYYY-MM-DD (ej: 1990-05-15)' 
    })
  date_of_birth: string;
  
  @ApiProperty({
    description: 'Dirección de la persona',
    example: 'Calle Principal 123, Apartamento 4B',
    maxLength: 255,
    required: false,
    name:'direccion'
  })
  @Expose({name:'direccion'})
  @IsString({ message: 'La dirección debe ser texto' })
  @IsOptional()
  @MaxLength(255, { message: 'La dirección no debe exceder 255 caracteres' })
  address: string;
  
  @ApiProperty({
    description: 'Teléfono de contacto (solo números)',
    example: '5551234567',
    maxLength: 20,
    required: false,
    name:'telefono'
  })
  @Expose({name:'telefono'})
  @IsString({ message: 'El teléfono debe ser texto' })
  @IsOptional()
  @MaxLength(20, { message: 'El teléfono no debe exceder 20 caracteres' })
  @Matches(/^[0-9]+$/, { 
    message: 'El teléfono solo puede contener números' 
  })  
  phone: string;
}
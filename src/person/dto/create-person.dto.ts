import { IsDateString, IsNotEmpty, IsOptional, IsString, Matches, MaxLength } from "class-validator";


export class CreatePersonDto {
  @IsString({ message: 'El apellido paterno debe ser texto' })
  @IsNotEmpty({ message: 'El apellido paterno es requerido' })
  @MaxLength(100, { message: 'El apellido paterno no debe exceder 100 caracteres' })
  @Matches(/^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/, { 
    message: 'El apellido paterno solo puede contener letras y espacios' 
  })
  last_name: string;

  @IsOptional()
  @IsString({ message: 'El apellido materno debe ser texto' })
  @MaxLength(100, { message: 'El apellido materno no debe exceder 100 caracteres' })
  @Matches(/^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]*$/, { 
    message: 'El apellido materno solo puede contener letras y espacios' 
  })
  middle_name?: string;

  @IsString({ message: 'El nombre deben ser texto' })
  @IsNotEmpty({ message: 'EL nombre es requerido' })
  @MaxLength(100, { message: 'El nombre no debe exceder 100 caracteres' })
  @Matches(/^[A-Za-zÁáÉéÍíÓóÚúÑñ\s]+$/, { 
    message: 'El nombre solo puede contener letras y espacios' 
  })
  first_name: string;
  
  @IsNotEmpty({ message: 'La fecha de nacimiento es requerida' })
  @Matches(/^\d{4}-\d{2}-\d{2}$/, { 
    message: 'La fecha de nacimiento debe tener formato YYYY-MM-DD (ej: 1990-05-15)' 
    })
  date_of_birth: string;
  
  @IsString({ message: 'La dirección debe ser texto' })
  @IsOptional()
  @MaxLength(255, { message: 'La dirección no debe exceder 255 caracteres' })
  address: string;
  
  @IsString({ message: 'El teléfono debe ser texto' })
  @IsOptional()
  @MaxLength(20, { message: 'El teléfono no debe exceder 20 caracteres' })
  @Matches(/^[0-9]+$/, { 
    message: 'El teléfono solo puede contener números' 
  })  
  phone: string;
}
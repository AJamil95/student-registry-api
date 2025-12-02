# Student Registry API

API REST para gestionar registros de estudiantes construida con NestJS, TypeORM y PostgreSQL.

## Descripción

Esta API proporciona endpoints para:

- **Personas**: Crear, leer, actualizar y eliminar registros de personas con información básica (nombres, apellidos, fecha de nacimiento, contacto)
- **Estudiantes**: Gestionar estudiantes asociados a personas con información de planes de estudio

## Requisitos Previos

- Node.js v18+ y npm
- PostgreSQL instalado y ejecutándose
- Git

## Instalación Rápida

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd student-registry-api
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar base de datos

Crear archivo `.env` en la raíz del proyecto:

```env
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=your_password
DB_NAME=student_registry
NODE_ENV=development
```

### 4. Crear y restaurar base de datos

**Windows (PowerShell):**

```powershell
.\db\restore.ps1
```

**Linux/Mac (Bash):**

```bash
./db/restore.sh
```

## Ejecutar la Aplicación

```bash
# Desarrollo (modo watch)
npm run start:dev

# Producción
npm run start:prod

# Debug
npm run start:debug
```

La API estará disponible en `http://localhost:3000`

## Documentación Swagger

Accede a la documentación interactiva en: `http://localhost:3000/api/docs`

Aquí puedes explorar y probar todos los endpoints disponibles.

## Endpoints Principales

### Personas

- `POST /api/v1/person` - Crear persona
- `GET /api/v1/person` - Obtener todas las personas
- `GET /api/v1/person/:id` - Obtener persona por ID
- `PATCH /api/v1/person/:id` - Actualizar persona
- `DELETE /api/v1/person/:id` - Eliminar persona

### Estudiantes

- `POST /api/v1/student` - Crear estudiante
- `GET /api/v1/student` - Obtener todos los estudiantes
- `GET /api/v1/student/:id` - Obtener estudiante por ID
- `PATCH /api/v1/student/:id` - Actualizar estudiante
- `DELETE /api/v1/student/:id` - Eliminar estudiante

## Stack Tecnológico

- **Runtime**: Node.js
- **Framework**: NestJS
- **ORM**: TypeORM
- **Base de Datos**: PostgreSQL
- **Validación**: class-validator y class-transformer
- **Documentación**: Swagger/OpenAPI

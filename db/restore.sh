#!/bin/bash

ServerHost="localhost"
Port="5433"
User="postgres"
Database="student_registry_db"

# ----- Pedir contraseña -----
read -s -p "Ingrese contraseña de PostgreSQL: " Password
echo ""

export PGPASSWORD="$Password"
export PGCLIENTENCODING="UTF8"

# -------------------------------------------------
# CREAR BASE DE DATOS SI NO EXISTE
# -------------------------------------------------
echo "Verificando base de datos..."

dbExists=$(psql -h "$ServerHost" -p "$Port" -U "$User" -tAc "SELECT 1 FROM pg_database WHERE datname='$Database'")

if [[ "$dbExists" != "1" ]]; then
    echo "Base de datos no existe. Creando..."
    psql -h "$ServerHost" -p "$Port" -U "$User" -c "CREATE DATABASE $Database;"
    sleep 2
else
    echo "Base de datos ya existe."
fi

# -------------------------------------------------
# EJECUTAR SCHEMA
# -------------------------------------------------
echo "Ejecutando SCHEMA..."
psql -h "$ServerHost" -p "$Port" -U "$User" -d "$Database" -f "01_schema.sql"

# -------------------------------------------------
# EJECUTAR DATA
# -------------------------------------------------
echo "Ejecutando DATA..."
psql -h "$ServerHost" -p "$Port" -U "$User" -d "$Database" -f "02_data.sql"

echo "Restauración completada ✔"

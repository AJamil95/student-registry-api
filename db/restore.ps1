param(
    [string]$ServerHost = "localhost",
    [string]$Port = "5432",
    [string]$User = "postgres",
    [securestring]$Password,
    [string]$Database = "student_registry_db"
)

if (-not $Password) {
    $Password = Read-Host "Ingrese contraseña de PostgreSQL" -AsSecureString
}

$plainPass = [Runtime.InteropServices.Marshal]::PtrToStringAuto(
    [Runtime.InteropServices.Marshal]::SecureStringToBSTR($Password)
)

$env:PGPASSWORD = $plainPass
$env:PGCLIENTENCODING = "UTF8"

# -------------------------------------------------
# CREAR BASE DE DATOS SI NO EXISTE
# -------------------------------------------------
Write-Host "Verificando base de datos..."

$dbExists = psql -h $ServerHost -p $Port -U $User -tAc "SELECT 1 FROM pg_database WHERE datname='$Database'"

if ($dbExists -ne "1") {
    Write-Host "Base de datos no existe. Creando..."
    psql -h $ServerHost -p $Port -U $User -c "CREATE DATABASE $Database;"
    Start-Sleep -Seconds 2
}
else {
    Write-Host "Base de datos ya existe."
}

# -------------------------------------------------
# EJECUTAR DDL
# -------------------------------------------------
Write-Host "Ejecutando SCHEMA..."
psql -h $ServerHost -p $Port -U $User -d $Database -f "01_schema.sql"

# -------------------------------------------------
# EJECUTAR DML
# -------------------------------------------------
Write-Host "Ejecutando DATA..."
psql -h $ServerHost -p $Port -U $User -d $Database -f "02_data.sql"

Write-Host "Restauración completada ✔" -ForegroundColor Green

@echo off
setlocal enabledelayedexpansion

:: Verificar que se proporcionó un parámetro
if "%~1"=="" (
    echo Error: Debes proporcionar el nombre de la entidad como parámetro
    echo Uso: create_structure.bat [nombre_entidad]
    exit /b 1
)

:: Obtener el nombre de la entidad desde el parámetro
set ENTITY_NAME=%~1

:: CAPITALIZACIÓN con PowerShell
for /f "tokens=*" %%i in ('powershell -Command "$text = '%ENTITY_NAME%'; $text.Substring(0,1).ToUpper() + $text.Substring(1)"') do (
    set ENTITY_CAPITALIZED=%%i
)

:: set ENTITY_CAPITALIZED=!ENTITY_CAPITALIZED!!ENTITY_NAME:~1!
echo Creando estructura para la entidad: !ENTITY_NAME!
::echo Nombre capitalizado: !ENTITY_CAPITALIZED!

:: Crear directorios principales
mkdir src\modules
:: mkdir src\modules\!ENTITY_NAME!

:: Crear estructura de domain
:: mkdir src\modules\!ENTITY_NAME!\domain
:: mkdir src\modules\!ENTITY_NAME!\domain\entities
:: mkdir src\modules\!ENTITY_NAME!\domain\ports

:: Crear estructura de usecase
:: mkdir src\modules\!ENTITY_NAME!\usecase

:: Crear estructura de infrastructure
:: mkdir src\modules\!ENTITY_NAME!\infrastructure
:: mkdir src\modules\!ENTITY_NAME!\infrastructure\repositories
:: mkdir src\modules\!ENTITY_NAME!\infrastructure\orm

:: Crear estructura de application
:: mkdir src\modules\!ENTITY_NAME!\application
:: mkdir src\modules\!ENTITY_NAME!\application\controllers
:: mkdir src\modules\!ENTITY_NAME!\application\dto

:: Crear archivos con nombre dinámico
echo Generando controlador con Nest CLI...
call nest g co "modules/!ENTITY_NAME!/application/controllers/!ENTITY_NAME!" --flat --no-spec

:: CREAR INTERFACE PORT
echo Generando interface de puerto con Nest CLI...
call nest g class "modules/!ENTITY_NAME!/domain/ports/i!ENTITY_NAME!.interface" --flat --no-spec

:: CREAR ENTITY CON TYPEORM
echo Generando entity con Nest CLI...
call nest g class "modules/!ENTITY_NAME!/domain/entities/!ENTITY_NAME!.entity" --flat --no-spec

:: CREAR REPOSITORY
echo Generando repositorio con Nest CLI...
call nest g class "modules/!ENTITY_NAME!/infrastructure/repositories/!ENTITY_NAME!.repository" --flat --no-spec

:: CREAR DTO
echo Generando DTO con Nest CLI...
call nest g class "modules/!ENTITY_NAME!/application/dto/create-!ENTITY_NAME!.dto" --flat --no-spec

:: CREAR USECASE
echo Generando caso de uso con Nest CLI...
call nest g class "modules/!ENTITY_NAME!/usecase/create-!ENTITY_NAME!.usecase" --flat --no-spec

:: CREAR MODULE
echo Generando módulo con Nest CLI...
call nest g mo modules/!ENTITY_NAME!

:: echo Generando entity
:: (
::   echo import { Entity } from 'typeorm';
::   echo.
::   echo @Entity^(^)
::   echo export class !ENTITY_CAPITALIZED! ^{
::   echo ^}
::   echo.
:: ) > src\modules\!ENTITY_NAME!\domain\entities\!ENTITY_NAME!.entity.ts


:: call nest g class "modules/!ENTITY_NAME!/domain/entities/!ENTITY_NAME!.entity" --no-spec
::type nul > src\modules\!ENTITY_NAME!\domain\entities\!ENTITY_NAME!.entity.ts
:: type nul > src\modules\!ENTITY_NAME!\domain\ports\!ENTITY_NAME!.repository.ts
:: type nul > src\modules\!ENTITY_NAME!\application\controllers\!ENTITY_NAME!.controller.ts

echo Estructura creada exitosamente para !ENTITY_NAME!
echo.
:: dir src\modules\!ENTITY_NAME! /s
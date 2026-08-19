---
description: Convenciones y estructura real del backend VeciReport
alwaysApply: true
---

# VeciReport backend

## Stack y comandos

- Backend con NestJS 11 y TypeScript 5.9. Usa `pnpm`; no sustituyas los comandos por `npm`.
- Persistencia con TypeORM y MariaDB. Las credenciales se cargan desde `.env` mediante `ConfigModule`.
- Node.js 20 es la versión usada por el `Dockerfile`.
- Instala dependencias con `pnpm install`.
- Desarrollo: `pnpm run start:dev`.
- Compilación: `pnpm run build`.
- Lint y formato: `pnpm run lint` y `pnpm run format`.
- Pruebas unitarias: `pnpm run test`; cobertura: `pnpm run test:cov`.
- Pruebas e2e: `pnpm run test:e2e` con `test/jest-e2e.json`.

## Estructura

```text
src/
   main.ts                 # Bootstrap, Swagger y ValidationPipe global
   app.module.ts           # Configuración raíz, TypeORM y módulos
   common/
      auth/                 # JwtAuthGuard y JwtStrategy
      decorators/           # Decoradores compartidos
      global/               # GlobalJwtModule
      utils/                # Utilidades compartidas, como slug.util.ts
   modules/
      attach/
      cat-type-report/
      community/
      report/
      user/
         application/
            controllers/      # Entrada HTTP del módulo
            dto/               # Validación de entrada con class-validator
         domain/
            entities/          # Entidades TypeORM y reglas del dominio
            ports/             # Interfaces/contratos del dominio
         infrastructure/
            repositories/      # Implementaciones de persistencia
         usecase/             # Casos de uso de la aplicación
test/                     # Configuración y pruebas e2e
```

Cada módulo de negocio mantiene la misma separación `application`, `domain`, `infrastructure` y `usecase`. Los módulos actuales son `attach`, `cat-type-report`, `community`, `report` y `user`. Respeta los nombres existentes y no crees rutas genéricas como `src/api`, `src/config` o `src/services`.

## Convenciones de implementación

- Coloca cada endpoint en `modules/<nombre>/application/controllers` y sus DTOs junto al controlador.
- Coloca las entidades en `domain/entities`, los contratos en `domain/ports`, los casos de uso en `usecase` y los repositorios TypeORM en `infrastructure/repositories`.
- Registra nuevas entidades, repositorios, casos de uso y controladores en el `<nombre>.module.ts` correspondiente.
- Usa interfaces de `domain/ports` para desacoplar los casos de uso de TypeORM.
- Usa `class-validator` y `class-transformer` en los DTOs; la aplicación ya activa `ValidationPipe` globalmente.
- Reutiliza la autenticación de `common/auth`, `common/global/jwt.module.ts` y los decoradores compartidos antes de añadir otra implementación.
- Mantén los cambios enfocados en el módulo afectado y conserva las APIs públicas existentes salvo que el cambio lo requiera.
- No añadas comentarios obvios ni inventes migraciones o scripts que no existan en `package.json`.
- Antes de crear archivos, consulta la estructura real de `src/modules` y revisa el controlador, el módulo y los casos de uso del módulo afectado; replica el patrón local en lugar de inventar una capa nueva.
- No crees archivos o carpetas `service`, `services` ni clases `*Service`: este proyecto organiza la lógica de aplicación en casos de uso dentro de `usecase` y los controladores los consumen mediante inyección de dependencias.

### Convención de nombres

- Conserva la convención de nombres que ya utiliza el proyecto antes de crear o modificar archivos; no renombres clases, archivos, imports o tokens existentes solo para aplicar otro estilo.
- Usa nombres de módulos y carpetas en `kebab-case`, por ejemplo `cat-type-report`, y mantén las capas `application`, `domain`, `infrastructure` y `usecase` en minúsculas.
- Usa archivos en `kebab-case` con el sufijo de su responsabilidad: `<name>.module.ts`, `<name>.controller.ts`, `<name>.entity.ts`, `<name>.repository.ts`, `<operation>-<name>.usecase.ts` y `<operation>-<name>.dto.ts`.
- Usa clases en `PascalCase` y conserva el nombre del módulo como prefijo: `CatTypeReportModule`, `CatTypeReportController`, `CatTypeReportEntity` y `CatTypeReportRepository`.
- Nombra los DTOs como `Create<Name>Dto`, `Update<Name>Dto` o `Register<Name>Dto`, respetando la operación que representan y el nombre de la entidad.
- Nombra los casos de uso con `<Operation><Name>Usecase` cuando el módulo existente ya use `Usecase`; para nuevos casos de uso, conserva la variante que predomine en el módulo y no mezcles ambas variantes sin necesidad.
- Nombra los contratos con el prefijo `Base`, el nombre de la entidad y el sufijo `Interface`, y conserva el prefijo de archivo `i-`, por ejemplo `i-cat-type-report.interface.ts` y `BaseCatTypeReportInterface`.
- Usa propiedades y métodos en `camelCase`, constantes en `UPPER_SNAKE_CASE` solo cuando sean constantes compartidas, y nombres explícitos como `createCommunityUsecase` o `catTypeReportRepository` para dependencias inyectadas.
- Mantén en singular los nombres de entidades, repositorios y casos de uso; usa nombres de rutas HTTP coherentes con el recurso existente, como `community` y `cat-type-report`.
- Cuando un archivo existente no siga exactamente estas reglas, respeta su nombre público y replica su convención local en los archivos relacionados para evitar romper imports o la inyección de NestJS.

### Controladores

- Declara el controlador con `@Controller('<recurso>')` y agrúpalo en Swagger con `@ApiTags('<Recurso>')`.
- Inyecta directamente en el constructor los casos de uso ya existentes como dependencias `private readonly`, por ejemplo `private readonly createCommunityUsecase: CreateCommunityUsecase`; no reemplaces esta inyección por un `Service`.
- El controlador es la entrada HTTP y delega en los casos de uso; no agregues una capa `service` intermedia ni dupliques en el controlador la lógica que ya pertenece al caso de uso.
- El controlador no debe inyectar repositorios ni usar TypeORM directamente.
- Usa nombres de métodos que expresen la operación, como `createCommunity`, y nombres de rutas coherentes con el recurso, como `POST /community/register` cuando el flujo sea de registro.
- Recibe el cuerpo mediante un DTO con `@Body()`. Delega la operación al caso de uso llamando a `execute(...)` y devuelve su resultado sin duplicar lógica de negocio.
- Documenta los endpoints con `@ApiOperation` y las respuestas esperadas (`@ApiCreatedResponse`, `@ApiOkResponse`, `@ApiBadRequestResponse` y `@ApiInternalServerErrorResponse`) cuando corresponda.
- Protege los endpoints que lo requieran con los guards y decoradores de `common/auth` y `common/decorators`.

### Protección de rutas con JWT

- Antes de crear una estrategia, guard o módulo de autenticación, reutiliza `JwtStrategy`, `JwtAuthGuard`, `GlobalJwtModule`, `Roles` y `GetUser` de `common`; no dupliques la autenticación dentro de un módulo de negocio.
- Protege una ruta autenticada con `@UseGuards(JwtAuthGuard)` y agrega `@ApiBearerAuth()` para que Swagger documente el header `Authorization: Bearer <token>`.
- Puedes aplicar `@UseGuards(JwtAuthGuard)` al método para proteger una sola ruta o al controlador para proteger todas sus rutas; elige el alcance más pequeño que corresponda al requisito.
- Usa `@Roles('admin')` junto con `JwtAuthGuard` únicamente en rutas administrativas. El guard actual consulta `request.user` y valida `user.isAdmin`; no implementes una comprobación paralela en el controlador.
- Obtén el usuario autenticado con `@GetUser()` cuando el controlador necesite su información. No leas ni decodifiques manualmente el token desde los headers.
- Conserva las rutas públicas de autenticación, como login y registro, sin `JwtAuthGuard` salvo que el requisito lo indique expresamente.
- `JwtStrategy` extrae el token desde `Authorization` con `ExtractJwt.fromAuthHeaderAsBearerToken()`, rechaza tokens expirados y busca al usuario mediante `GetUserEmailUsecase`; mantén ese flujo al modificar la autenticación.
- `JwtAuthGuard` debe continuar extendiendo `AuthGuard('jwt')`, delegar la validación inicial a Passport y traducir los errores a `UnauthorizedException` según el comportamiento existente.
- La configuración JWT se mantiene en `GlobalJwtModule`, que registra `PassportModule`, `JwtModule`, `JwtStrategy` y `JwtAuthGuard`, e importa `UserModule` para resolver `GetUserEmailUsecase`.
- Si una nueva estrategia o guard necesita casos de uso de usuario, registra y exporta la dependencia desde `UserModule`; no inyectes directamente el repositorio TypeORM en `common/auth`.

### DTOs y validación

- Define un DTO por operación en `application/dto`, con nombres como `Create<Name>Dto`, `Update<Name>Dto` y `Register<Name>Dto`.
- En actualizaciones, marca las propiedades con `@IsOptional()` y conserva las restricciones de tipo, longitud y mensajes en español ya usados por el módulo.
- No aceptes entidades ni objetos sin validar desde el controlador; los casos de uso deben recibir DTOs o tipos derivados como `Partial<Update<Name>Dto>`.

### Casos de uso

- Marca cada caso de uso con `@Injectable()` y expón un único método público `execute(...)`.
- Inyecta en el constructor el puerto del dominio (`Base<Name>Interface`) como `private readonly <name>Repository`; no inyectes `Repository<Entity>` directamente.
- Antes de crear un caso de uso, busca si ya existe uno para la operación solicitada y reutilízalo inyectándolo en el controlador; crea un archivo nuevo únicamente cuando no exista una implementación equivalente.
- El caso de uso coordina reglas de negocio, transformación de datos, hashing y traducción de errores. La persistencia debe delegarse al puerto.
- Para crear, recibe el DTO de creación y llama a `repository.create(...)`. Para actualizar, recibe `id` y un `Partial<Update<Name>Dto>` y llama a `repository.update(id, data)`.
- Mantén los nombres de archivo y clases compatibles con los módulos existentes: actualmente conviven `Usecase` y `UseCase`; para código nuevo prefiere `UseCase` y conserva los nombres públicos existentes al modificar código actual.

### Puertos, repositorios y entidades

- Declara en `domain/ports` los métodos que necesita el caso de uso, normalmente `create`, `findOne`, `findAll`, `update` y `delete`.
- Implementa el puerto en `infrastructure/repositories/<name>.repository.ts` y usa `@InjectRepository(<Name>Entity)` para recibir el repositorio de TypeORM.
- Para crear, usa `repository.create(...)` seguido de `repository.save(...)` cuando se necesite construir la entidad explícitamente; `save(...)` directo también es un patrón existente para DTOs simples.
- Antes de actualizar, busca la entidad con `findOne(id)`. Si no existe, devuelve `null`; no inventes una entidad ni ocultes ese resultado en el repositorio.
- Para eliminar, usa `softDelete(id)` y devuelve `true` únicamente cuando `affected === 1`, respetando el borrado lógico de las entidades.
- Mantén las entidades TypeORM en `domain/entities`, con sus columnas, relaciones y columnas de auditoría (`createdAt`, `updatedAt`, `deletedAt`) según el patrón del módulo.

### Módulos e inyección de dependencias

- En cada módulo, incluye la entidad en `TypeOrmModule.forFeature([...])`.
- Vincula cada puerto con su implementación mediante `{ provide: Base<Name>Interface, useClass: <Name>Repository }` dentro de `providers`.
- Registra los casos de uso existentes y el controlador en el módulo correspondiente para que NestJS pueda resolver la inyección; no instancies dependencias manualmente.
- Si el controlador necesita crear o actualizar, inyecta `Create<Name>Usecase` y `Update<Name>UseCase` (usando exactamente los nombres declarados en el proyecto) y llama a su método `execute(...)`.
- Si un caso de uso usa un puerto de otro módulo, importa y exporta el módulo necesario en vez de acceder directamente a su repositorio.

### Imports y estilo

- Prefiere imports relativos que respeten la ubicación por capas (`../../domain/...`, `../dto/...`); mantén los imports absolutos existentes solo cuando no sea práctico cambiarlos.
- Conserva el estilo del archivo: el código actual usa sangría de cuatro espacios y mezcla comillas simples y dobles, por lo que no reformatees archivos no relacionados.
- Usa retornos tipados (`Promise<Entity>`, `Promise<Entity | null>` y `Promise<boolean>`) y evita `Promise<any>` en código nuevo.

## Configuración HTTP y base de datos

- La aplicación escucha en `process.env.PORT` o en el puerto `3000`.
- Swagger está disponible en `/api` y usa autenticación Bearer.
- TypeORM usa `type: 'mariadb'`, carga las entidades desde `src/**/*.entity.ts` y habilita `synchronize` únicamente cuando `APP_ENV=development`.
- Variables usadas por la configuración actual: `PORT`, `APP_ENV`, `HOST_DATABASE`, `DB_PORT`, `USER_DATABASE`, `PASSWORD_DATABASE` y `NAME_DATABASE`.
- No expongas valores de `.env` ni credenciales en el código, pruebas o documentación.

## Flujo para cambios

1. Identifica el módulo y sigue su estructura existente.
2. Actualiza DTO, entidad, puerto, caso de uso, repositorio, controlador y módulo solo cuando corresponda.
3. Añade o actualiza pruebas cercanas al comportamiento modificado.
4. Ejecuta al menos `pnpm run build` y la prueba específica relacionada antes de entregar el cambio.
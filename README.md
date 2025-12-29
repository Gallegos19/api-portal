# Clean Architecture API

Una API RESTful construida con Node.js, TypeScript, Express y Prisma ORM siguiendo los principios de arquitectura limpia (hexagonal).

## Estructura del Proyecto

Este proyecto sigue una arquitectura hexagonal (también conocida como puertos y adaptadores):

```
src/
├── domain/            # Entidades, objetos de valor, interfaces de repositorios
├── application/       # Casos de uso, DTOs, interfaces de servicios
├── infrastructure/    # Implementaciones concretas (repositorios, servicios)
├── interfaces/        # Controladores, rutas, middlewares
└── shared/            # Utilidades compartidas, errores, configuraciones
```

## Tecnologías Utilizadas

- Node.js
- TypeScript
- Express
- Prisma ORM
- PostgreSQL
- JWT para autenticación
- bcrypt para encriptación de contraseñas

## Requisitos Previos

- Node.js (v14+)
- PostgreSQL
- npm o yarn

## Instalación

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/tu-usuario/clean-architecture-api.git
   cd clean-architecture-api
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Configurar variables de entorno:
   - Copia `.env.example` a `.env`
   - Actualiza las credenciales de la base de datos y otras configuraciones

4. Genera el cliente Prisma:
   ```bash
   npm run prisma:generate
   ```

5. Ejecuta las migraciones de la base de datos:
   ```bash
   npm run prisma:migrate
   ```

## Ejecución

Para desarrollo:
```bash
npm run dev
```

Para producción:
```bash
npm run build
npm start
```

## Endpoints API

### Autenticación

- `POST /api/auth/login` - Iniciar sesión

### Usuarios

- `POST /api/users` - Crear usuario
- `GET /api/users` - Obtener todos los usuarios
- `GET /api/users/:id` - Obtener usuario por ID

### Documentos

- `POST /api/documents` - Crear documento
- `GET /api/documents` - Obtener todos los documentos
- `GET /api/documents/:id` - Obtener documento por ID
- `GET /api/documents/intern/:internId` - Obtener documentos por ID de interno

### Internos

- `POST /api/interns` - Crear interno
- `GET /api/interns` - Obtener todos los internos
- `GET /api/interns/:id` - Obtener interno por ID
- `GET /api/interns/user/:userId` - Obtener interno por ID de usuario
- `GET /api/interns/facilitator/:facilitatorId` - Obtener internos por ID de facilitador social
- `GET /api/interns/subproject/:subprojectId` - Obtener internos por ID de subproyecto

### Regiones

- `POST /api/regions` - Crear región
- `GET /api/regions` - Obtener todas las regiones
- `GET /api/regions/:id` - Obtener región por ID

### Subproyectos

- `POST /api/subprojects` - Crear subproyecto
- `GET /api/subprojects` - Obtener todos los subproyectos
- `GET /api/subprojects/:id` - Obtener subproyecto por ID
- `GET /api/subprojects/region/:regionId` - Obtener subproyectos por ID de región

### Facilitadores Sociales

- `POST /api/social-facilitators` - Crear facilitador social
- `GET /api/social-facilitators` - Obtener todos los facilitadores sociales
- `GET /api/social-facilitators/:id` - Obtener facilitador social por ID
- `GET /api/social-facilitators/user/:userId` - Obtener facilitador social por ID de usuario
- `GET /api/social-facilitators/subproject/:subprojectId` - Obtener facilitadores sociales por ID de subproyecto

## Coordinadores

- `POST /api/coordinators - Crear coordinador
- `GET /api/coordinators - Obtener todos los coordinadores
- `GET /api/coordinators/:id - Obtener coordinador por ID
- `GET /api/coordinators/user/:userId - Obtener coordinador por ID de usuario

## Archivos

- `POST /api/archives - Crear archivo
- `GET /api/archives - Obtener todos los archivos
- `GET /api/archives/:id - Obtener archivo por ID
- `GET /api/archives/uploader/:userId - Obtener archivos por ID de usuario que los subió
- `GET /api/archives/type/:fileType - Obtener archivos por tipo de archivo

## Reportes

- `POST /api/reports - Crear reporte
- `GET /api/reports - Obtener todos los reportes
- `GET /api/reports/:id - Obtener reporte por ID
- `GET /api/reports/creator/:creatorId - Obtener reportes por ID de creador
- `GET /api/reports/type/:type - Obtener reportes por tipo

## Formatos

- `POST /api/formats - Crear formato
- `GET /api/formats - Obtener todos los formatos
- `GET /api/formats/:id - Obtener formato por ID
- `GET /api/formats/creator/:creatorId - Obtener formatos por ID de creador

## Capacitaciones

- `POST /api/trainings - Crear capacitación
- `GET /api/trainings - Obtener todas las capacitaciones
- `GET /api/trainings/:id - Obtener capacitación por ID
- `GET /api/trainings/creator/:creatorId - Obtener capacitaciones por ID de creador

## Fotos

- `POST /api/photos - Crear foto
- `GET /api/photos - Obtener todas las fotos
- `GET /api/photos/:id - Obtener foto por ID
- `GET /api/photos/creator/:creatorId - Obtener fotos por ID de creador

## Eventos

- `POST /api/events - Crear evento
- `GET /api/events - Obtener todos los eventos
- `GET /api/events/:id - Obtener evento por ID
- `GET /api/events/creator/:creatorId - Obtener eventos por ID de creador

## Relación Evento-Foto

- `POST /api/event-photos - Crear relación evento-foto
- `GET /api/event-photos/event/:eventId - Obtener relaciones por ID de evento
- `GET /api/event-photos/photo/:photoId - Obtener relaciones por ID de foto
- `DELETE /api/event-photos/:id - Eliminar relación evento-foto

## Historias de Éxito

- `POST /api/success-stories - Crear historia de éxito
- `GET /api/success-stories - Obtener todas las historias de éxito
- `GET /api/success-stories/:id - Obtener historia de éxito por ID
- `GET /api/success-stories/creator/:creatorId - Obtener historias de éxito por ID de creador

## Modelo de Datos

El modelo de datos incluye las siguientes entidades principales:

- User (Usuario)
- Document (Documento)
- Report (Reporte)
- Archive (Archivo)
- Format (Formato)
- Training (Capacitación)
- Photo (Foto)
- Event (Evento)
- Intern (Interno)
- SocialFacilitator (Facilitador Social)
- Subproject (Subproyecto)
- Region (Región)
- Coordinator (Coordinador)
- EventPhoto ( Relacion fotos de evento)
- SuccessStory (Historia de exito)

## Pruebas

Para ejecutar las pruebas:
```bash
npm test
```

## Estructura del Código

### Domain Layer

Contiene las entidades centrales del negocio y las interfaces de los repositorios que definen cómo se accederá a los datos.

### Application Layer

Contiene los casos de uso de la aplicación, que orquestan la lógica de negocio utilizando las entidades del dominio.

### Infrastructure Layer

Contiene las implementaciones concretas de las interfaces definidas en el dominio, como los repositorios que utilizan Prisma para acceder a la base de datos.

### Interfaces Layer

Contiene los controladores, rutas y middlewares que manejan las solicitudes HTTP.

## Contribución

1. Fork el repositorio
2. Crea una rama para tu característica (`git checkout -b feature/amazing-feature`)
3. Haz commit de tus cambios (`git commit -m 'Add some amazing feature'`)
4. Push a la rama (`git push origin feature/amazing-feature`)
5. Abre un Pull Request

## Licencia

[MIT](LICENSE)
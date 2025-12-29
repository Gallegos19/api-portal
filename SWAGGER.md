# Documentación Swagger de la API

## 📚 Descripción

Esta API REST está completamente documentada usando Swagger/OpenAPI 3.0. La documentación incluye todos los endpoints, esquemas de datos, parámetros de solicitud y respuestas.

## 🚀 Acceso a la Documentación

Una vez que la API esté en ejecución, puedes acceder a la documentación interactiva de Swagger en:

**URL de Swagger UI:**
```
http://localhost:3000/api-docs
```

**URL del JSON de Swagger:**
```
http://localhost:3000/api-docs.json
```

## 🔐 Autenticación

La mayoría de los endpoints requieren autenticación mediante JWT (JSON Web Token). Para usar estos endpoints en Swagger:

1. Primero, realiza el login en el endpoint `/api/auth/login`
2. Copia el token JWT que recibes en la respuesta
3. Haz clic en el botón "Authorize" (🔒) en la parte superior de Swagger UI
4. Ingresa el token en el campo "Value" con el formato: `Bearer <tu-token-aquí>`
5. Haz clic en "Authorize"

Ahora podrás probar todos los endpoints protegidos.

## 📋 Endpoints Documentados

La API incluye los siguientes grupos de endpoints:

### Autenticación
- `POST /api/auth/login` - Iniciar sesión

### Usuarios
- `POST /api/users` - Crear usuario
- `GET /api/users` - Obtener todos los usuarios
- `GET /api/users/{id}` - Obtener usuario por ID

### Regiones
- `POST /api/regions` - Crear región
- `GET /api/regions` - Obtener todas las regiones
- `GET /api/regions/{id}` - Obtener región por ID

### Subproyectos
- `POST /api/subprojects` - Crear subproyecto
- `GET /api/subprojects` - Obtener todos los subproyectos
- `GET /api/subprojects/{id}` - Obtener subproyecto por ID
- `GET /api/subprojects/region/{regionId}` - Obtener subproyectos por región

### Coordinadores
- `POST /api/coordinators` - Crear coordinador
- `GET /api/coordinators` - Obtener todos los coordinadores
- `GET /api/coordinators/{id}` - Obtener coordinador por ID
- `GET /api/coordinators/user/{userId}` - Obtener coordinador por usuario

### Facilitadores Sociales
- `POST /api/social-facilitators` - Crear facilitador social
- `GET /api/social-facilitators` - Obtener todos los facilitadores
- `GET /api/social-facilitators/{id}` - Obtener facilitador por ID
- `GET /api/social-facilitators/user/{userId}` - Obtener facilitador por usuario
- `GET /api/social-facilitators/subproject/{subprojectId}` - Obtener facilitadores por subproyecto

### Internos
- `POST /api/interns` - Crear interno
- `GET /api/interns` - Obtener todos los internos
- `GET /api/interns/{id}` - Obtener interno por ID
- `GET /api/interns/user/{userId}` - Obtener interno por usuario
- `GET /api/interns/facilitator/{facilitatorId}` - Obtener internos por facilitador
- `GET /api/interns/subproject/{subprojectId}` - Obtener internos por subproyecto

### Documentos
- `POST /api/documents` - Crear documento
- `GET /api/documents` - Obtener todos los documentos
- `GET /api/documents/{id}` - Obtener documento por ID
- `GET /api/documents/intern/{internId}` - Obtener documentos por interno

### Archivos
- `POST /api/archives` - Crear archivo
- `GET /api/archives` - Obtener todos los archivos
- `GET /api/archives/{id}` - Obtener archivo por ID
- `GET /api/archives/uploader/{userId}` - Obtener archivos por usuario
- `GET /api/archives/type/{fileType}` - Obtener archivos por tipo

### Reportes
- `POST /api/reports` - Crear reporte
- `GET /api/reports` - Obtener todos los reportes
- `GET /api/reports/{id}` - Obtener reporte por ID
- `GET /api/reports/creator/{creatorId}` - Obtener reportes por creador
- `GET /api/reports/type/{type}` - Obtener reportes por tipo

### Formatos
- `POST /api/formats` - Crear formato
- `GET /api/formats` - Obtener todos los formatos
- `GET /api/formats/{id}` - Obtener formato por ID
- `GET /api/formats/creator/{creatorId}` - Obtener formatos por creador

### Capacitaciones
- `POST /api/trainings` - Crear capacitación
- `GET /api/trainings` - Obtener todas las capacitaciones
- `GET /api/trainings/{id}` - Obtener capacitación por ID
- `GET /api/trainings/creator/{creatorId}` - Obtener capacitaciones por creador

### Fotos
- `POST /api/photos` - Crear foto
- `GET /api/photos` - Obtener todas las fotos
- `GET /api/photos/{id}` - Obtener foto por ID
- `GET /api/photos/creator/{creatorId}` - Obtener fotos por creador

### Eventos
- `POST /api/events` - Crear evento
- `GET /api/events` - Obtener todos los eventos
- `GET /api/events/{id}` - Obtener evento por ID
- `GET /api/events/creator/{creatorId}` - Obtener eventos por creador

### Fotos de Eventos
- `POST /api/event-photos` - Relacionar evento con foto
- `GET /api/event-photos/event/{eventId}` - Obtener fotos por evento
- `GET /api/event-photos/photo/{photoId}` - Obtener eventos por foto
- `DELETE /api/event-photos/{id}` - Eliminar relación evento-foto

### Historias de Éxito
- `POST /api/success-stories` - Crear historia de éxito
- `GET /api/success-stories` - Obtener todas las historias
- `GET /api/success-stories/{id}` - Obtener historia por ID
- `GET /api/success-stories/creator/{creatorId}` - Obtener historias por creador

## 🛠️ Características de la Documentación

- **Esquemas de datos**: Todos los modelos de datos están documentados
- **Validaciones**: Los campos requeridos y tipos de datos están especificados
- **Ejemplos**: Cada endpoint incluye ejemplos de solicitud
- **Códigos de respuesta**: Todos los posibles códigos HTTP están documentados
- **Try it out**: Puedes probar los endpoints directamente desde Swagger UI
- **Autenticación JWT**: Sistema de autenticación integrado en la interfaz

## 📝 Notas Adicionales

- La documentación está configurada con OpenAPI 3.0
- Los esquemas incluyen validaciones y tipos de datos
- Se incluyen tanto el servidor de desarrollo como de producción
- La interfaz de Swagger está personalizada para una mejor experiencia de usuario

## 🔄 Actualización de la Documentación

La documentación se genera automáticamente a partir de las anotaciones JSDoc en los archivos de rutas. Para actualizar la documentación:

1. Modifica las anotaciones `@swagger` en los archivos de rutas
2. Reinicia el servidor
3. La documentación se actualizará automáticamente

## 🌐 Servidores

La documentación incluye dos servidores predefinidos:

- **Desarrollo**: `http://localhost:3000`
- **Producción**: `https://api.portal.com`

Puedes cambiar entre servidores en el selector de la interfaz de Swagger UI.

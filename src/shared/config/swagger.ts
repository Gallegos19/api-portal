import swaggerJsdoc from 'swagger-jsdoc';
import { Options } from 'swagger-jsdoc';

const options: Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Portal API Documentation',
      version: '1.0.0',
      description: 'API REST para el sistema de gestión de Portal con arquitectura limpia',
      contact: {
        name: 'API Support',
        email: 'support@portal.com',
      },
    },
    servers: [
      {
        url: 'http://localhost:3001',
        description: 'Servidor de desarrollo',
      },
      {
        url: 'https://api.portal.com',
        description: 'Servidor de producción',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
          description: 'Ingrese el token JWT obtenido del endpoint de login',
        },
      },
      schemas: {
        Error: {
          type: 'object',
          properties: {
            message: {
              type: 'string',
              description: 'Mensaje de error',
            },
            error: {
              type: 'string',
              description: 'Detalles del error',
            },
          },
        },
        User: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'ID único del usuario',
            },
            name: {
              type: 'string',
              description: 'Nombre completo del usuario',
            },
            email: {
              type: 'string',
              description: 'Correo electrónico del usuario',
            },
            role: {
              type: 'string',
              description: 'Rol del usuario en el sistema',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              description: 'Fecha de creación',
            },
          },
        },
        LoginRequest: {
          type: 'object',
          required: ['email', 'password'],
          properties: {
            email: {
              type: 'string',
              format: 'email',
              description: 'Correo electrónico del usuario',
              example: 'user@example.com',
            },
            password: {
              type: 'string',
              format: 'password',
              description: 'Contraseña del usuario',
              example: 'password123',
            },
          },
        },
        LoginResponse: {
          type: 'object',
          properties: {
            token: {
              type: 'string',
              description: 'Token JWT de autenticación',
            },
            user: {
              $ref: '#/components/schemas/User',
            },
          },
        },
        Region: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'ID único de la región',
            },
            name: {
              type: 'string',
              description: 'Nombre de la región',
            },
            description: {
              type: 'string',
              description: 'Descripción de la región',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Subproject: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
            name: {
              type: 'string',
            },
            description: {
              type: 'string',
            },
            regionId: {
              type: 'string',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Coordinator: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
            userId: {
              type: 'string',
            },
            regionId: {
              type: 'string',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        SocialFacilitator: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
            userId: {
              type: 'string',
            },
            regionId: {
              type: 'string',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Intern: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
            userId: {
              type: 'string',
            },
            socialFacilitatorId: {
              type: 'string',
            },
            subprojectId: {
              type: 'string',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Document: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
            title: {
              type: 'string',
            },
            description: {
              type: 'string',
            },
            internId: {
              type: 'string',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Archive: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
            fileName: {
              type: 'string',
            },
            fileType: {
              type: 'string',
            },
            fileUrl: {
              type: 'string',
            },
            uploaderUserId: {
              type: 'string',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Report: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
            title: {
              type: 'string',
            },
            type: {
              type: 'string',
            },
            creatorId: {
              type: 'string',
            },
            archiveId: {
              type: 'string',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Format: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
            name: {
              type: 'string',
            },
            description: {
              type: 'string',
            },
            creatorId: {
              type: 'string',
            },
            archiveId: {
              type: 'string',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Training: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
            name: {
              type: 'string',
            },
            description: {
              type: 'string',
            },
            creatorId: {
              type: 'string',
            },
            archiveId: {
              type: 'string',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Photo: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
            title: {
              type: 'string',
            },
            description: {
              type: 'string',
            },
            creatorId: {
              type: 'string',
            },
            archiveId: {
              type: 'string',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        Event: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
            name: {
              type: 'string',
            },
            description: {
              type: 'string',
            },
            date: {
              type: 'string',
              format: 'date-time',
            },
            creatorId: {
              type: 'string',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        EventPhoto: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
            eventId: {
              type: 'string',
            },
            photoId: {
              type: 'string',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
        SuccessStory: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
            },
            title: {
              type: 'string',
            },
            description: {
              type: 'string',
            },
            creatorId: {
              type: 'string',
            },
            photoId: {
              type: 'string',
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
            },
          },
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/interface/http/routes/*.ts'], // Ruta a los archivos que contienen las anotaciones de Swagger
};

export const swaggerSpec = swaggerJsdoc(options);

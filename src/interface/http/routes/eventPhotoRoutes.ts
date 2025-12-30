import { Router } from 'express';
import { EventPhotoController } from '../controllers/EventPhotoController';
import { CreateEventPhotoUseCase } from '../../../application/use-cases/eventPhoto/CreateEventPhotoUseCase';
import { GetEventPhotosByEventIdUseCase } from '../../../application/use-cases/eventPhoto/GetEventPhotosByEventIdUseCase';
import { GetEventPhotosByPhotoIdUseCase } from '../../../application/use-cases/eventPhoto/GetEventPhotosByPhotoIdUseCase';
import { DeleteEventPhotoUseCase } from '../../../application/use-cases/eventPhoto/DeleteEventPhotoUseCase';
import { UpdateEventPhotoUseCase } from '../../../application/use-cases/eventPhoto/UpdateEventPhotoUseCase';
import { PrismaEventPhotoRepository } from '../../../infrastructure/repositories/PrismaEventPhotoRepository';
import { PrismaEventRepository } from '../../../infrastructure/repositories/PrismaEventRepository';
import { PrismaPhotoRepository } from '../../../infrastructure/repositories/PrismaPhotoRepository';
import { authMiddleware } from '../middlewares/authMiddleware';

const eventPhotoRoutes = Router();

// Dependencies
const eventPhotoRepository = new PrismaEventPhotoRepository();
const eventRepository = new PrismaEventRepository();
const photoRepository = new PrismaPhotoRepository();
const createEventPhotoUseCase = new CreateEventPhotoUseCase(
  eventPhotoRepository,
  eventRepository,
  photoRepository
);
const getEventPhotosByEventIdUseCase = new GetEventPhotosByEventIdUseCase(eventPhotoRepository);
const getEventPhotosByPhotoIdUseCase = new GetEventPhotosByPhotoIdUseCase(eventPhotoRepository);
const deleteEventPhotoUseCase = new DeleteEventPhotoUseCase(eventPhotoRepository);
const updateEventPhotoUseCase = new UpdateEventPhotoUseCase(eventPhotoRepository);

// Controller
const eventPhotoController = new EventPhotoController(
  createEventPhotoUseCase,
  getEventPhotosByEventIdUseCase,
  getEventPhotosByPhotoIdUseCase,
  deleteEventPhotoUseCase,
  updateEventPhotoUseCase
);

// Routes

/**
 * @swagger
 * /api/event-photos:
 *   post:
 *     summary: Crear una nueva relación entre evento y foto
 *     tags: [Fotos de Eventos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - eventId
 *               - photoId
 *             properties:
 *               eventId:
 *                 type: string
 *               photoId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Relación evento-foto creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventPhoto'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
eventPhotoRoutes.post('/', authMiddleware, async (req, res) => { await eventPhotoController.create(req, res); });

/**
 * @swagger
 * /api/event-photos/event/{eventId}:
 *   get:
 *     summary: Obtener fotos de un evento por ID de evento
 *     tags: [Fotos de Eventos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: eventId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del evento
 *     responses:
 *       200:
 *         description: Lista de fotos del evento
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EventPhoto'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
eventPhotoRoutes.get('/event/:eventId', authMiddleware, async (req, res) => { await eventPhotoController.getByEventId(req, res); });

/**
 * @swagger
 * /api/event-photos/photo/{photoId}:
 *   get:
 *     summary: Obtener eventos de una foto por ID de foto
 *     tags: [Fotos de Eventos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: photoId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la foto
 *     responses:
 *       200:
 *         description: Lista de eventos de la foto
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/EventPhoto'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
eventPhotoRoutes.get('/photo/:photoId', authMiddleware, async (req, res) => { await eventPhotoController.getByPhotoId(req, res); });

/**
 * @swagger
 * /api/event-photos/{id}:
 *   delete:
 *     summary: Eliminar una relación entre evento y foto
 *     tags: [Fotos de Eventos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la relación evento-foto
 *     responses:
 *       200:
 *         description: Relación eliminada exitosamente
 *       404:
 *         description: Relación no encontrada
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
eventPhotoRoutes.delete('/:id', authMiddleware, async (req, res) => { await eventPhotoController.delete(req, res); });

/**
 * @swagger
 * /api/event-photos/{id}:
 *   put:
 *     summary: Actualizar una relación entre evento y foto
 *     tags: [Fotos de Eventos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la relación evento-foto
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_event:
 *                 type: string
 *               id_photo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Relación actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/EventPhoto'
 *       404:
 *         description: Relación no encontrada
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
eventPhotoRoutes.put('/:id', authMiddleware, async (req, res) => { await eventPhotoController.update(req, res); });

export { eventPhotoRoutes };
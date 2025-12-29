import { Router } from 'express';
import { EventController } from '../controllers/EventController';
import { CreateEventUseCase } from '../../../application/use-cases/event/CreateEventUseCase';
import { GetAllEventsUseCase } from '../../../application/use-cases/event/GetAllEventsUseCase';
import { GetEventByIdUseCase } from '../../../application/use-cases/event/GetEventByIdUseCase';
import { GetEventsByCreatorIdUseCase } from '../../../application/use-cases/event/GetEventsByCreatorIdUseCase';
import { PrismaEventRepository } from '../../../infrastructure/repositories/PrismaEventRepository';
import { PrismaUserRepository } from '../../../infrastructure/repositories/PrismaUserRepository';
import { authMiddleware } from '../middlewares/authMiddleware';

const eventRoutes = Router();

// Dependencies
const eventRepository = new PrismaEventRepository();
const userRepository = new PrismaUserRepository();
const createEventUseCase = new CreateEventUseCase(
  eventRepository,
  userRepository
);
const getAllEventsUseCase = new GetAllEventsUseCase(eventRepository);
const getEventByIdUseCase = new GetEventByIdUseCase(eventRepository);
const getEventsByCreatorIdUseCase = new GetEventsByCreatorIdUseCase(eventRepository);

// Controller
const eventController = new EventController(
  createEventUseCase,
  getAllEventsUseCase,
  getEventByIdUseCase,
  getEventsByCreatorIdUseCase
);

// Routes

/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Crear un nuevo evento
 *     tags: [Eventos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - date
 *               - creatorId
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               date:
 *                 type: string
 *                 format: date-time
 *               creatorId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Evento creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 *   get:
 *     summary: Obtener todos los eventos
 *     tags: [Eventos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de eventos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
eventRoutes.post('/', authMiddleware, async (req, res) => { await eventController.create(req, res); });
eventRoutes.get('/', authMiddleware, async (req, res) => { await eventController.getAll(req, res); });

/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     summary: Obtener evento por ID
 *     tags: [Eventos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del evento
 *     responses:
 *       200:
 *         description: Evento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Event'
 *       404:
 *         description: Evento no encontrado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
eventRoutes.get('/:id', authMiddleware, async (req, res) => { await eventController.getById(req, res); });

/**
 * @swagger
 * /api/events/creator/{creatorId}:
 *   get:
 *     summary: Obtener eventos por ID de creador
 *     tags: [Eventos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: creatorId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del creador del evento
 *     responses:
 *       200:
 *         description: Lista de eventos del creador
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Event'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
eventRoutes.get('/creator/:creatorId', authMiddleware, async (req, res) => { await eventController.getByCreatorId(req, res); });

export { eventRoutes };
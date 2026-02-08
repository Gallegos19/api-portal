import { Router } from 'express';
import { TrainingController } from '../controllers/TrainingController';
import { CreateTrainingUseCase } from '../../../application/use-cases/training/CreateTrainingUseCase';
import { GetAllTrainingsUseCase } from '../../../application/use-cases/training/GetAllTrainingsUseCase';
import { GetTrainingByIdUseCase } from '../../../application/use-cases/training/GetTrainingByIdUseCase';
import { GetTrainingsByCreatorIdUseCase } from '../../../application/use-cases/training/GetTrainingsByCreatorIdUseCase';
import { UpdateTrainingUseCase } from '../../../application/use-cases/training/UpdateTrainingUseCase';
import { DeleteTrainingUseCase } from '../../../application/use-cases/training/DeleteTrainingUseCase';
import { PrismaTrainingRepository } from '../../../infrastructure/repositories/PrismaTrainingRepository';
import { PrismaUserRepository } from '../../../infrastructure/repositories/PrismaUserRepository';
import { authMiddleware } from '../middlewares/authMiddleware';

const trainingRoutes = Router();

// Dependencies
const trainingRepository = new PrismaTrainingRepository();
const userRepository = new PrismaUserRepository();
const createTrainingUseCase = new CreateTrainingUseCase(
  trainingRepository,
  userRepository
);
const getAllTrainingsUseCase = new GetAllTrainingsUseCase(trainingRepository);
const getTrainingByIdUseCase = new GetTrainingByIdUseCase(trainingRepository);
const getTrainingsByCreatorIdUseCase = new GetTrainingsByCreatorIdUseCase(trainingRepository);
const updateTrainingUseCase = new UpdateTrainingUseCase(trainingRepository);
const deleteTrainingUseCase = new DeleteTrainingUseCase(trainingRepository);

// Controller
const trainingController = new TrainingController(
  createTrainingUseCase,
  getAllTrainingsUseCase,
  getTrainingByIdUseCase,
  getTrainingsByCreatorIdUseCase,
  updateTrainingUseCase,
  deleteTrainingUseCase
);

// Routes

/**
 * @swagger
 * /api/trainings:
 *   post:
 *     summary: Crear una nueva capacitación
 *     tags: [Capacitaciones]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título de la capacitación
 *               description:
 *                 type: string
 *                 description: Descripción de la capacitación
 *               url:
 *                 type: string
 *                 description: URL del recurso de capacitación (video, documento, etc.)
 *               tiempo:
 *                 type: string
 *                 description: Duración en formato HH:MM (ej. "3:30")
 *                 example: "3:30"
 *               target_audience:
 *                 type: string
 *                 description: Audiencia objetivo de la capacitación
 *               status_id:
 *                 type: string
 *                 description: ID del estado
 *               school_year_id:
 *                 type: string
 *                 description: ID del año escolar
 *     responses:
 *       201:
 *         description: Capacitación creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Training'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 *   get:
 *     summary: Obtener todas las capacitaciones
 *     tags: [Capacitaciones]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de capacitaciones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Training'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
trainingRoutes.post('/', authMiddleware, async (req, res) => { await trainingController.create(req, res); });
trainingRoutes.get('/', authMiddleware, async (req, res) => { await trainingController.getAll(req, res); });

/**
 * @swagger
 * /api/trainings/{id}:
 *   get:
 *     summary: Obtener capacitación por ID
 *     tags: [Capacitaciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la capacitación
 *     responses:
 *       200:
 *         description: Capacitación encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Training'
 *       404:
 *         description: Capacitación no encontrada
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
trainingRoutes.get('/:id', authMiddleware, async (req, res) => { await trainingController.getById(req, res); });

/**
 * @swagger
 * /api/trainings/{id}:
 *   put:
 *     summary: Actualizar una capacitación
 *     tags: [Capacitaciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la capacitación
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: Título de la capacitación
 *               description:
 *                 type: string
 *                 description: Descripción de la capacitación
 *               url:
 *                 type: string
 *                 description: URL del recurso de capacitación
 *               tiempo:
 *                 type: string
 *                 description: Duración en formato HH:MM (ej. "3:30")
 *                 example: "3:30"
 *               target_audience:
 *                 type: string
 *                 description: Audiencia objetivo
 *               status_id:
 *                 type: string
 *                 description: ID del estado
 *               school_year_id:
 *                 type: string
 *                 description: ID del año escolar
 *     responses:
 *       200:
 *         description: Capacitación actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Training'
 *       404:
 *         description: Capacitación no encontrada
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
trainingRoutes.put('/:id', authMiddleware, async (req, res) => { await trainingController.update(req, res); });

/**
 * @swagger
 * /api/trainings/creator/{creatorId}:
 *   get:
 *     summary: Obtener capacitaciones por ID de creador
 *     tags: [Capacitaciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: creatorId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del creador de la capacitación
 *     responses:
 *       200:
 *         description: Lista de capacitaciones del creador
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Training'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
trainingRoutes.get('/creator/:creatorId', authMiddleware, async (req, res) => { await trainingController.getByCreatorId(req, res); });

/**
 * @swagger
 * /api/trainings/{id}:
 *   delete:
 *     summary: Eliminar capacitación (eliminado lógico)
 *     tags: [Capacitaciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la capacitación
 *     responses:
 *       204:
 *         description: Capacitación eliminada exitosamente
 *       404:
 *         description: Capacitación no encontrada
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
trainingRoutes.delete('/:id', authMiddleware, async (req, res) => { await trainingController.delete(req, res); });

export { trainingRoutes };
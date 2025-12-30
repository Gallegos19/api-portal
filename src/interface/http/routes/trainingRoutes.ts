import { Router } from 'express';
import { TrainingController } from '../controllers/TrainingController';
import { CreateTrainingUseCase } from '../../../application/use-cases/training/CreateTrainingUseCase';
import { GetAllTrainingsUseCase } from '../../../application/use-cases/training/GetAllTrainingsUseCase';
import { GetTrainingByIdUseCase } from '../../../application/use-cases/training/GetTrainingByIdUseCase';
import { GetTrainingsByCreatorIdUseCase } from '../../../application/use-cases/training/GetTrainingsByCreatorIdUseCase';
import { UpdateTrainingUseCase } from '../../../application/use-cases/training/UpdateTrainingUseCase';
import { PrismaTrainingRepository } from '../../../infrastructure/repositories/PrismaTrainingRepository';
import { PrismaUserRepository } from '../../../infrastructure/repositories/PrismaUserRepository';
import { PrismaArchiveRepository } from '../../../infrastructure/repositories/PrismaArchiveRepository';
import { authMiddleware } from '../middlewares/authMiddleware';

const trainingRoutes = Router();

// Dependencies
const trainingRepository = new PrismaTrainingRepository();
const userRepository = new PrismaUserRepository();
const archiveRepository = new PrismaArchiveRepository();
const createTrainingUseCase = new CreateTrainingUseCase(
  trainingRepository,
  userRepository,
  archiveRepository
);
const getAllTrainingsUseCase = new GetAllTrainingsUseCase(trainingRepository);
const getTrainingByIdUseCase = new GetTrainingByIdUseCase(trainingRepository);
const getTrainingsByCreatorIdUseCase = new GetTrainingsByCreatorIdUseCase(trainingRepository);
const updateTrainingUseCase = new UpdateTrainingUseCase(trainingRepository);

// Controller
const trainingController = new TrainingController(
  createTrainingUseCase,
  getAllTrainingsUseCase,
  getTrainingByIdUseCase,
  getTrainingsByCreatorIdUseCase,
  updateTrainingUseCase
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
 *               - name
 *               - creatorId
 *               - archiveId
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               creatorId:
 *                 type: string
 *               archiveId:
 *                 type: string
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
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               id_archive:
 *                 type: string
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

export { trainingRoutes };
import { Router } from 'express';
import { TrainingProgressController } from '../controllers/TrainingProgressController';
import { CreateTrainingProgressUseCase } from '../../../application/use-cases/trainingProgress/CreateTrainingProgressUseCase';
import { GetAllTrainingProgressUseCase } from '../../../application/use-cases/trainingProgress/GetAllTrainingProgressUseCase';
import { GetTrainingProgressByIdUseCase } from '../../../application/use-cases/trainingProgress/GetTrainingProgressByIdUseCase';
import { GetProgressByTrainingIdUseCase } from '../../../application/use-cases/trainingProgress/GetProgressByTrainingIdUseCase';
import { GetProgressByUserIdUseCase } from '../../../application/use-cases/trainingProgress/GetProgressByUserIdUseCase';
import { GetProgressByTrainingAndUserUseCase } from '../../../application/use-cases/trainingProgress/GetProgressByTrainingAndUserUseCase';
import { UpdateTrainingProgressUseCase } from '../../../application/use-cases/trainingProgress/UpdateTrainingProgressUseCase';
import { DeleteTrainingProgressUseCase } from '../../../application/use-cases/trainingProgress/DeleteTrainingProgressUseCase';
import { PrismaTrainingProgressRepository } from '../../../infrastructure/repositories/PrismaTrainingProgressRepository';
import { PrismaTrainingRepository } from '../../../infrastructure/repositories/PrismaTrainingRepository';
import { PrismaUserRepository } from '../../../infrastructure/repositories/PrismaUserRepository';
import { authMiddleware } from '../middlewares/authMiddleware';

const trainingProgressRoutes = Router();

// Dependencies
const trainingProgressRepository = new PrismaTrainingProgressRepository();
const trainingRepository = new PrismaTrainingRepository();
const userRepository = new PrismaUserRepository();

const createTrainingProgressUseCase = new CreateTrainingProgressUseCase(
  trainingProgressRepository,
  trainingRepository,
  userRepository
);
const getAllTrainingProgressUseCase = new GetAllTrainingProgressUseCase(trainingProgressRepository);
const getTrainingProgressByIdUseCase = new GetTrainingProgressByIdUseCase(trainingProgressRepository);
const getProgressByTrainingIdUseCase = new GetProgressByTrainingIdUseCase(trainingProgressRepository);
const getProgressByUserIdUseCase = new GetProgressByUserIdUseCase(trainingProgressRepository);
const getProgressByTrainingAndUserUseCase = new GetProgressByTrainingAndUserUseCase(trainingProgressRepository);
const updateTrainingProgressUseCase = new UpdateTrainingProgressUseCase(trainingProgressRepository);
const deleteTrainingProgressUseCase = new DeleteTrainingProgressUseCase(trainingProgressRepository);

// Controller
const trainingProgressController = new TrainingProgressController(
  createTrainingProgressUseCase,
  getAllTrainingProgressUseCase,
  getTrainingProgressByIdUseCase,
  getProgressByTrainingIdUseCase,
  getProgressByUserIdUseCase,
  getProgressByTrainingAndUserUseCase,
  updateTrainingProgressUseCase,
  deleteTrainingProgressUseCase
);

// Routes

/**
 * @swagger
 * /api/training-progress:
 *   post:
 *     summary: Crear un nuevo registro de progreso de capacitación
 *     tags: [Progreso de Capacitaciones]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id_training
 *               - id_user
 *             properties:
 *               id_training:
 *                 type: string
 *                 description: ID de la capacitación
 *               id_user:
 *                 type: string
 *                 description: ID del usuario
 *               progress_percentage:
 *                 type: integer
 *                 minimum: 0
 *                 maximum: 100
 *                 description: Porcentaje de progreso inicial (0-100)
 *     responses:
 *       201:
 *         description: Progreso creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainingProgress'
 *       404:
 *         description: Capacitación o usuario no encontrado
 *       409:
 *         description: Ya existe un progreso para este usuario y capacitación
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 *   get:
 *     summary: Obtener todos los registros de progreso
 *     tags: [Progreso de Capacitaciones]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de todos los progresos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TrainingProgress'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
trainingProgressRoutes.post('/', authMiddleware, async (req, res) => { 
  await trainingProgressController.create(req, res); 
});
trainingProgressRoutes.get('/', authMiddleware, async (req, res) => { 
  await trainingProgressController.getAll(req, res); 
});

/**
 * @swagger
 * /api/training-progress/{id}:
 *   get:
 *     summary: Obtener progreso por ID
 *     tags: [Progreso de Capacitaciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del progreso
 *     responses:
 *       200:
 *         description: Progreso encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainingProgress'
 *       404:
 *         description: Progreso no encontrado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 *   put:
 *     summary: Actualizar progreso de capacitación
 *     tags: [Progreso de Capacitaciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del progreso
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               progress_percentage:
 *                 type: integer
 *                 minimum: 0
 *                 maximum: 100
 *                 description: Porcentaje de progreso (0-100)
 *               completed:
 *                 type: boolean
 *                 description: Marcar como completado
 *     responses:
 *       200:
 *         description: Progreso actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainingProgress'
 *       400:
 *         description: Datos inválidos
 *       404:
 *         description: Progreso no encontrado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 *   delete:
 *     summary: Eliminar progreso de capacitación
 *     tags: [Progreso de Capacitaciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del progreso
 *     responses:
 *       204:
 *         description: Progreso eliminado exitosamente
 *       404:
 *         description: Progreso no encontrado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
trainingProgressRoutes.get('/:id', authMiddleware, async (req, res) => { 
  await trainingProgressController.getById(req, res); 
});
trainingProgressRoutes.put('/:id', authMiddleware, async (req, res) => { 
  await trainingProgressController.update(req, res); 
});
trainingProgressRoutes.delete('/:id', authMiddleware, async (req, res) => { 
  await trainingProgressController.delete(req, res); 
});

/**
 * @swagger
 * /api/training-progress/training/{trainingId}:
 *   get:
 *     summary: Obtener todos los progresos de una capacitación específica
 *     tags: [Progreso de Capacitaciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: trainingId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la capacitación
 *     responses:
 *       200:
 *         description: Lista de progresos de la capacitación
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TrainingProgress'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
trainingProgressRoutes.get('/training/:trainingId', authMiddleware, async (req, res) => { 
  await trainingProgressController.getByTrainingId(req, res); 
});

/**
 * @swagger
 * /api/training-progress/user/{userId}:
 *   get:
 *     summary: Obtener todos los progresos de un usuario específico
 *     tags: [Progreso de Capacitaciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Lista de progresos del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/TrainingProgress'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
trainingProgressRoutes.get('/user/:userId', authMiddleware, async (req, res) => { 
  await trainingProgressController.getByUserId(req, res); 
});

/**
 * @swagger
 * /api/training-progress/training/{trainingId}/user/{userId}:
 *   get:
 *     summary: Obtener el progreso de un usuario en una capacitación específica
 *     tags: [Progreso de Capacitaciones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: trainingId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la capacitación
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario
 *     responses:
 *       200:
 *         description: Progreso encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/TrainingProgress'
 *       404:
 *         description: Progreso no encontrado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
trainingProgressRoutes.get('/training/:trainingId/user/:userId', authMiddleware, async (req, res) => { 
  await trainingProgressController.getByTrainingAndUser(req, res); 
});

/**
 * @swagger
 * components:
 *   schemas:
 *     TrainingProgress:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *           description: ID único del progreso
 *         id_training:
 *           type: string
 *           description: ID de la capacitación
 *         id_user:
 *           type: string
 *           description: ID del usuario
 *         completed:
 *           type: boolean
 *           description: Si la capacitación está completada
 *         progress_percentage:
 *           type: integer
 *           description: Porcentaje de progreso (0-100)
 *         completed_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de completado
 *         started_at:
 *           type: string
 *           format: date-time
 *           description: Fecha de inicio
 *         last_viewed_at:
 *           type: string
 *           format: date-time
 *           description: Última vez que se vio la capacitación
 */

export { trainingProgressRoutes };

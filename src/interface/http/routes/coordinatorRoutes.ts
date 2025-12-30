import { Router } from 'express';
import { CoordinatorController } from '../controllers/CoordinatorController';
import { CreateCoordinatorUseCase } from '../../../application/use-cases/coordinator/CreateCoordinatorUseCase';
import { GetAllCoordinatorsUseCase } from '../../../application/use-cases/coordinator/GetAllCoordinatorsUseCase';
import { GetCoordinatorByIdUseCase } from '../../../application/use-cases/coordinator/GetCoordinatorByIdUseCase';
import { GetCoordinatorByUserIdUseCase } from '../../../application/use-cases/coordinator/GetCoordinatorByUserIdUseCase';
import { UpdateCoordinatorUseCase } from '../../../application/use-cases/coordinator/UpdateCoordinatorUseCase';
import { PrismaCoordinatorRepository } from '../../../infrastructure/repositories/PrismaCoordinatorRepository';
import { PrismaUserRepository } from '../../../infrastructure/repositories/PrismaUserRepository';
import { PrismaRegionRepository } from '../../../infrastructure/repositories/PrismaRegionRepository';
import { authMiddleware } from '../middlewares/authMiddleware';

const coordinatorRoutes = Router();

// Dependencies
const coordinatorRepository = new PrismaCoordinatorRepository();
const userRepository = new PrismaUserRepository();
const regionRepository = new PrismaRegionRepository();
const createCoordinatorUseCase = new CreateCoordinatorUseCase(
  coordinatorRepository,
  userRepository,
  regionRepository
);
const getAllCoordinatorsUseCase = new GetAllCoordinatorsUseCase(coordinatorRepository);
const getCoordinatorByIdUseCase = new GetCoordinatorByIdUseCase(coordinatorRepository);
const getCoordinatorByUserIdUseCase = new GetCoordinatorByUserIdUseCase(coordinatorRepository);
const updateCoordinatorUseCase = new UpdateCoordinatorUseCase(coordinatorRepository);

// Controller
const coordinatorController = new CoordinatorController(
  createCoordinatorUseCase,
  getAllCoordinatorsUseCase,
  getCoordinatorByIdUseCase,
  getCoordinatorByUserIdUseCase,
  updateCoordinatorUseCase
);

// Routes

/**
 * @swagger
 * /api/coordinators:
 *   post:
 *     summary: Crear un nuevo coordinador
 *     tags: [Coordinadores]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - regionId
 *             properties:
 *               userId:
 *                 type: string
 *               regionId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Coordinador creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coordinator'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 *   get:
 *     summary: Obtener todos los coordinadores
 *     tags: [Coordinadores]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de coordinadores
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Coordinator'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
coordinatorRoutes.post('/', authMiddleware, async (req, res) => { await coordinatorController.create(req, res); });
coordinatorRoutes.get('/', authMiddleware, async (req, res) => { await coordinatorController.getAll(req, res); });

/**
 * @swagger
 * /api/coordinators/{id}:
 *   get:
 *     summary: Obtener coordinador por ID
 *     tags: [Coordinadores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del coordinador
 *     responses:
 *       200:
 *         description: Coordinador encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coordinator'
 *       404:
 *         description: Coordinador no encontrado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
coordinatorRoutes.get('/:id', authMiddleware, async (req, res) => { await coordinatorController.getById(req, res); });

/**
 * @swagger
 * /api/coordinators/user/{userId}:
 *   get:
 *     summary: Obtener coordinador por ID de usuario
 *     tags: [Coordinadores]
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
 *         description: Coordinador encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Coordinator'
 *       404:
 *         description: Coordinador no encontrado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
coordinatorRoutes.get('/user/:userId', authMiddleware, async (req, res) => { await coordinatorController.getByUserId(req, res); });

/**
 * @swagger
 * /api/coordinators/{id}:
 *   put:
 *     summary: Actualizar un coordinador
 *     tags: [Coordinadores]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del coordinador
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_user:
 *                 type: string
 *               id_region:
 *                 type: string
 *     responses:
 *       200:
 *         description: Coordinador actualizado exitosamente
 *       404:
 *         description: Coordinador no encontrado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
coordinatorRoutes.put('/:id', authMiddleware, async (req, res) => { await coordinatorController.update(req, res); });

export { coordinatorRoutes };
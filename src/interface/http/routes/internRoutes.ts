import { Router } from 'express';
import { InternController } from '../controllers/InternController';
import { CreateInternUseCase } from '../../../application/use-cases/intern/CreateInternUseCase';
import { GetAllInternsUseCase } from '../../../application/use-cases/intern/GetAllInternsUseCase';
import { GetInternByIdUseCase } from '../../../application/use-cases/intern/GetInternByIdUseCase';
import { GetInternByUserIdUseCase } from '../../../application/use-cases/intern/GetInternByUserIdUseCase';
import { GetInternsBySocialFacilitatorIdUseCase } from '../../../application/use-cases/intern/GetInternsBySocialFacilitatorIdUseCase';
import { GetInternsBySubprojectIdUseCase } from '../../../application/use-cases/intern/GetInternsBySubprojectIdUseCase';
import { PrismaInternRepository } from '../../../infrastructure/repositories/PrismaInternRepository';
import { PrismaUserRepository } from '../../../infrastructure/repositories/PrismaUserRepository';
import { authMiddleware } from '../middlewares/authMiddleware';

const internRoutes = Router();

// Dependencies
const internRepository = new PrismaInternRepository();
const userRepository = new PrismaUserRepository();
const createInternUseCase = new CreateInternUseCase(internRepository, userRepository);
const getAllInternsUseCase = new GetAllInternsUseCase(internRepository);
const getInternByIdUseCase = new GetInternByIdUseCase(internRepository);
const getInternByUserIdUseCase = new GetInternByUserIdUseCase(internRepository);
const getInternsBySocialFacilitatorIdUseCase = new GetInternsBySocialFacilitatorIdUseCase(internRepository);
const getInternsBySubprojectIdUseCase = new GetInternsBySubprojectIdUseCase(internRepository);

// Controller
const internController = new InternController(
  createInternUseCase,
  getAllInternsUseCase,
  getInternByIdUseCase,
  getInternByUserIdUseCase,
  getInternsBySocialFacilitatorIdUseCase,
  getInternsBySubprojectIdUseCase
);

// Routes

/**
 * @swagger
 * /api/interns:
 *   post:
 *     summary: Crear un nuevo interno/pasante
 *     tags: [Internos]
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
 *             properties:
 *               userId:
 *                 type: string
 *               socialFacilitatorId:
 *                 type: string
 *               subprojectId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Interno creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Intern'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 *   get:
 *     summary: Obtener todos los internos
 *     tags: [Internos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de internos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Intern'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
internRoutes.post('/', authMiddleware, async (req, res) => { await internController.create(req, res); });
internRoutes.get('/', authMiddleware, async (req, res) => { await internController.getAll(req, res); });

/**
 * @swagger
 * /api/interns/{id}:
 *   get:
 *     summary: Obtener interno por ID
 *     tags: [Internos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del interno
 *     responses:
 *       200:
 *         description: Interno encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Intern'
 *       404:
 *         description: Interno no encontrado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
internRoutes.get('/:id', authMiddleware, async (req, res) => { await internController.getById(req, res); });

/**
 * @swagger
 * /api/interns/user/{userId}:
 *   get:
 *     summary: Obtener interno por ID de usuario
 *     tags: [Internos]
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
 *         description: Interno encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Intern'
 *       404:
 *         description: Interno no encontrado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
internRoutes.get('/user/:userId', authMiddleware, async (req, res) => { await internController.getByUserId(req, res); });

/**
 * @swagger
 * /api/interns/facilitator/{facilitatorId}:
 *   get:
 *     summary: Obtener internos por ID de facilitador social
 *     tags: [Internos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: facilitatorId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del facilitador social
 *     responses:
 *       200:
 *         description: Lista de internos del facilitador
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Intern'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
internRoutes.get('/facilitator/:facilitatorId', authMiddleware, async (req, res) => { await internController.getBySocialFacilitatorId(req, res); });

/**
 * @swagger
 * /api/interns/subproject/{subprojectId}:
 *   get:
 *     summary: Obtener internos por ID de subproyecto
 *     tags: [Internos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: subprojectId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del subproyecto
 *     responses:
 *       200:
 *         description: Lista de internos del subproyecto
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Intern'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
internRoutes.get('/subproject/:subprojectId', authMiddleware, async (req, res) => { await internController.getBySubprojectId(req, res); });

export { internRoutes };
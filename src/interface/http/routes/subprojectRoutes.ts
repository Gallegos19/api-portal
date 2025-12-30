import { Router } from 'express';
import { SubprojectController } from '../controllers/SubprojectController';
import { CreateSubprojectUseCase } from '../../../application/use-cases/subproject/CreateSubprojectUseCase';
import { GetAllSubprojectsUseCase } from '../../../application/use-cases/subproject/GetAllSubprojectsUseCase';
import { GetSubprojectByIdUseCase } from '../../../application/use-cases/subproject/GetSubprojectByIdUseCase';
import { GetSubprojectsByRegionIdUseCase } from '../../../application/use-cases/subproject/GetSubprojectsByRegionIdUseCase';
import { UpdateSubprojectUseCase } from '../../../application/use-cases/subproject/UpdateSubprojectUseCase';
import { PrismaSubprojectRepository } from '../../../infrastructure/repositories/PrismaSubprojectRepository';
import { PrismaRegionRepository } from '../../../infrastructure/repositories/PrismaRegionRepository';
import { PrismaCoordinatorRepository } from '../../../infrastructure/repositories/PrismaCoordinatorRepository';
import { PrismaSocialFacilitatorRepository } from '../../../infrastructure/repositories/PrismaSocialFacilitatorRepository';
import { authMiddleware } from '../middlewares/authMiddleware';

const subprojectRoutes = Router();

// Dependencies
const subprojectRepository = new PrismaSubprojectRepository();
const regionRepository = new PrismaRegionRepository();
const coordinatorRepository = new PrismaCoordinatorRepository();
const socialFacilitatorRepository = new PrismaSocialFacilitatorRepository();
const createSubprojectUseCase = new CreateSubprojectUseCase(
  subprojectRepository,
  regionRepository,
  coordinatorRepository,
  socialFacilitatorRepository
);
const getAllSubprojectsUseCase = new GetAllSubprojectsUseCase(subprojectRepository);
const getSubprojectByIdUseCase = new GetSubprojectByIdUseCase(subprojectRepository);
const getSubprojectsByRegionIdUseCase = new GetSubprojectsByRegionIdUseCase(subprojectRepository);
const updateSubprojectUseCase = new UpdateSubprojectUseCase(subprojectRepository);

// Controller
const subprojectController = new SubprojectController(
  createSubprojectUseCase,
  getAllSubprojectsUseCase,
  getSubprojectByIdUseCase,
  getSubprojectsByRegionIdUseCase,
  updateSubprojectUseCase
);

// Routes

/**
 * @swagger
 * /api/subprojects:
 *   post:
 *     summary: Crear un nuevo subproyecto
 *     tags: [Subproyectos]
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
 *               - regionId
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               regionId:
 *                 type: string
 *               coordinatorId:
 *                 type: string
 *               socialFacilitatorIds:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       201:
 *         description: Subproyecto creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subproject'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 *   get:
 *     summary: Obtener todos los subproyectos
 *     tags: [Subproyectos]
 *     responses:
 *       200:
 *         description: Lista de subproyectos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subproject'
 *       500:
 *         description: Error del servidor
 */
subprojectRoutes.post('/', authMiddleware, async (req, res) => { await subprojectController.create(req, res); });
subprojectRoutes.get('/', async (req, res) => { await subprojectController.getAll(req, res); });

/**
 * @swagger
 * /api/subprojects/{id}:
 *   get:
 *     summary: Obtener subproyecto por ID
 *     tags: [Subproyectos]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del subproyecto
 *     responses:
 *       200:
 *         description: Subproyecto encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subproject'
 *       404:
 *         description: Subproyecto no encontrado
 *       500:
 *         description: Error del servidor
 */
subprojectRoutes.get('/:id', async (req, res) => { await subprojectController.getById(req, res); });

/**
 * @swagger
 * /api/subprojects/{id}:
 *   put:
 *     summary: Actualizar un subproyecto
 *     tags: [Subproyectos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del subproyecto
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
 *               id_region:
 *                 type: string
 *               id_coordinator:
 *                 type: string
 *               socialFacilitatorIds:
 *                 type: array
 *                 items:
 *                   type: string
 *     responses:
 *       200:
 *         description: Subproyecto actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Subproject'
 *       404:
 *         description: Subproyecto no encontrado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
subprojectRoutes.put('/:id', authMiddleware, async (req, res) => { await subprojectController.update(req, res); });

/**
 * @swagger
 * /api/subprojects/region/{regionId}:
 *   get:
 *     summary: Obtener subproyectos por ID de región
 *     tags: [Subproyectos]
 *     parameters:
 *       - in: path
 *         name: regionId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la región
 *     responses:
 *       200:
 *         description: Lista de subproyectos de la región
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subproject'
 *       500:
 *         description: Error del servidor
 */
subprojectRoutes.get('/region/:regionId', async (req, res) => { await subprojectController.getByRegionId(req, res); });

export { subprojectRoutes };
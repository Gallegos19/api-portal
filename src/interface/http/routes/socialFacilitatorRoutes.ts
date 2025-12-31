import { Router } from 'express';
import { SocialFacilitatorController } from '../controllers/SocialFacilitatorController';
import { CreateSocialFacilitatorUseCase } from '../../../application/use-cases/socialFacilitator/CreateSocialFacilitatorUseCase';
import { GetAllSocialFacilitatorsUseCase } from '../../../application/use-cases/socialFacilitator/GetAllSocialFacilitatorsUseCase';
import { GetSocialFacilitatorByIdUseCase } from '../../../application/use-cases/socialFacilitator/GetSocialFacilitatorByIdUseCase';
import { GetSocialFacilitatorByUserIdUseCase } from '../../../application/use-cases/socialFacilitator/GetSocialFacilitatorByUserIdUseCase';
import { GetSocialFacilitatorsBySubprojectIdUseCase } from '../../../application/use-cases/socialFacilitator/GetSocialFacilitatorsBySubprojectIdUseCase';
import { UpdateSocialFacilitatorUseCase } from '../../../application/use-cases/socialFacilitator/UpdateSocialFacilitatorUseCase';
import { DeleteSocialFacilitatorUseCase } from '../../../application/use-cases/socialFacilitator/DeleteSocialFacilitatorUseCase';
import { PrismaSocialFacilitatorRepository } from '../../../infrastructure/repositories/PrismaSocialFacilitatorRepository';
import { PrismaUserRepository } from '../../../infrastructure/repositories/PrismaUserRepository';
import { PrismaSubprojectRepository } from '../../../infrastructure/repositories/PrismaSubprojectRepository';
import { PrismaRegionRepository } from '../../../infrastructure/repositories/PrismaRegionRepository';
import { authMiddleware } from '../middlewares/authMiddleware';

const socialFacilitatorRoutes = Router();

// Dependencies
const socialFacilitatorRepository = new PrismaSocialFacilitatorRepository();
const userRepository = new PrismaUserRepository();
const subprojectRepository = new PrismaSubprojectRepository();
const regionRepository =  new PrismaRegionRepository();
const createSocialFacilitatorUseCase = new CreateSocialFacilitatorUseCase(
  socialFacilitatorRepository,
  userRepository,
  regionRepository
);
const getAllSocialFacilitatorsUseCase = new GetAllSocialFacilitatorsUseCase(socialFacilitatorRepository);
const getSocialFacilitatorByIdUseCase = new GetSocialFacilitatorByIdUseCase(socialFacilitatorRepository);
const getSocialFacilitatorByUserIdUseCase = new GetSocialFacilitatorByUserIdUseCase(socialFacilitatorRepository);
const getSocialFacilitatorsBySubprojectIdUseCase = new GetSocialFacilitatorsBySubprojectIdUseCase(socialFacilitatorRepository);
const updateSocialFacilitatorUseCase = new UpdateSocialFacilitatorUseCase(socialFacilitatorRepository);
const deleteSocialFacilitatorUseCase = new DeleteSocialFacilitatorUseCase(socialFacilitatorRepository);

// Controller
const socialFacilitatorController = new SocialFacilitatorController(
  createSocialFacilitatorUseCase,
  getAllSocialFacilitatorsUseCase,
  getSocialFacilitatorByIdUseCase,
  getSocialFacilitatorByUserIdUseCase,
  getSocialFacilitatorsBySubprojectIdUseCase,
  updateSocialFacilitatorUseCase,
  deleteSocialFacilitatorUseCase
);

// Routes

/**
 * @swagger
 * /api/social-facilitators:
 *   post:
 *     summary: Crear un nuevo facilitador social
 *     tags: [Facilitadores Sociales]
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
 *         description: Facilitador social creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SocialFacilitator'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 *   get:
 *     summary: Obtener todos los facilitadores sociales
 *     tags: [Facilitadores Sociales]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de facilitadores sociales
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SocialFacilitator'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
socialFacilitatorRoutes.post('/', authMiddleware, async (req, res) => { await socialFacilitatorController.create(req, res); });
socialFacilitatorRoutes.get('/', authMiddleware, async (req, res) => { await socialFacilitatorController.getAll(req, res); });

/**
 * @swagger
 * /api/social-facilitators/{id}:
 *   get:
 *     summary: Obtener facilitador social por ID
 *     tags: [Facilitadores Sociales]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del facilitador social
 *     responses:
 *       200:
 *         description: Facilitador social encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SocialFacilitator'
 *       404:
 *         description: Facilitador social no encontrado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
socialFacilitatorRoutes.get('/:id', authMiddleware, async (req, res) => { await socialFacilitatorController.getById(req, res); });

/**
 * @swagger
 * /api/social-facilitators/{id}:
 *   put:
 *     summary: Actualizar un facilitador social
 *     tags: [Facilitadores Sociales]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del facilitador social
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
 *         description: Facilitador social actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SocialFacilitator'
 *       404:
 *         description: Facilitador social no encontrado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
socialFacilitatorRoutes.put('/:id', authMiddleware, async (req, res) => { await socialFacilitatorController.update(req, res); });

/**
 * @swagger
 * /api/social-facilitators/user/{userId}:
 *   get:
 *     summary: Obtener facilitador social por ID de usuario
 *     tags: [Facilitadores Sociales]
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
 *         description: Facilitador social encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SocialFacilitator'
 *       404:
 *         description: Facilitador social no encontrado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
socialFacilitatorRoutes.get('/user/:userId', authMiddleware, async (req, res) => { await socialFacilitatorController.getByUserId(req, res); });

/**
 * @swagger
 * /api/social-facilitators/subproject/{subprojectId}:
 *   get:
 *     summary: Obtener facilitadores sociales por ID de subproyecto
 *     tags: [Facilitadores Sociales]
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
 *         description: Lista de facilitadores sociales del subproyecto
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SocialFacilitator'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
socialFacilitatorRoutes.get('/subproject/:subprojectId', authMiddleware, async (req, res) => { await socialFacilitatorController.getBySubprojectId(req, res); });

/**
 * @swagger
 * /api/social-facilitators/{id}:
 *   delete:
 *     summary: Eliminar facilitador social (eliminado lógico)
 *     tags: [Facilitadores Sociales]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del facilitador social
 *     responses:
 *       204:
 *         description: Facilitador social eliminado exitosamente
 *       404:
 *         description: Facilitador social no encontrado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
socialFacilitatorRoutes.delete('/:id', authMiddleware, async (req, res) => { await socialFacilitatorController.delete(req, res); });

export { socialFacilitatorRoutes };
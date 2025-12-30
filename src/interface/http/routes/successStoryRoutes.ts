import { Router } from 'express';
import { SuccessStoryController } from '../controllers/SuccessStoryController';
import { CreateSuccessStoryUseCase } from '../../../application/use-cases/successStory/CreateSuccessStoryUseCase';
import { GetAllSuccessStoriesUseCase } from '../../../application/use-cases/successStory/GetAllSuccessStoriesUseCase';
import { GetSuccessStoryByIdUseCase } from '../../../application/use-cases/successStory/GetSuccessStoryByIdUseCase';
import { GetSuccessStoriesByCreatorIdUseCase } from '../../../application/use-cases/successStory/GetSuccessStoriesByCreatorIdUseCase';
import { UpdateSuccessStoryUseCase } from '../../../application/use-cases/successStory/UpdateSuccessStoryUseCase';
import { PrismaSuccessStoryRepository } from '../../../infrastructure/repositories/PrismaSuccessStoryRepository';
import { PrismaUserRepository } from '../../../infrastructure/repositories/PrismaUserRepository';
import { PrismaPhotoRepository } from '../../../infrastructure/repositories/PrismaPhotoRepository';
import { authMiddleware } from '../middlewares/authMiddleware';

const successStoryRoutes = Router();

// Dependencies
const successStoryRepository = new PrismaSuccessStoryRepository();
const userRepository = new PrismaUserRepository();
const photoRepository = new PrismaPhotoRepository();
const createSuccessStoryUseCase = new CreateSuccessStoryUseCase(
  successStoryRepository,
  userRepository,
  photoRepository
);
const getAllSuccessStoriesUseCase = new GetAllSuccessStoriesUseCase(successStoryRepository);
const getSuccessStoryByIdUseCase = new GetSuccessStoryByIdUseCase(successStoryRepository);
const getSuccessStoriesByCreatorIdUseCase = new GetSuccessStoriesByCreatorIdUseCase(successStoryRepository);
const updateSuccessStoryUseCase = new UpdateSuccessStoryUseCase(successStoryRepository);

// Controller
const successStoryController = new SuccessStoryController(
  createSuccessStoryUseCase,
  getAllSuccessStoriesUseCase,
  getSuccessStoryByIdUseCase,
  getSuccessStoriesByCreatorIdUseCase,
  updateSuccessStoryUseCase
);

// Routes

/**
 * @swagger
 * /api/success-stories:
 *   post:
 *     summary: Crear una nueva historia de éxito
 *     tags: [Historias de Éxito]
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
 *               - creatorId
 *               - photoId
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               creatorId:
 *                 type: string
 *               photoId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Historia de éxito creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessStory'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 *   get:
 *     summary: Obtener todas las historias de éxito
 *     tags: [Historias de Éxito]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de historias de éxito
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SuccessStory'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
successStoryRoutes.post('/', authMiddleware, async (req, res) => { await successStoryController.create(req, res); });
successStoryRoutes.get('/', authMiddleware, async (req, res) => { await successStoryController.getAll(req, res); });

/**
 * @swagger
 * /api/success-stories/{id}:
 *   get:
 *     summary: Obtener historia de éxito por ID
 *     tags: [Historias de Éxito]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la historia de éxito
 *     responses:
 *       200:
 *         description: Historia de éxito encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessStory'
 *       404:
 *         description: Historia de éxito no encontrada
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
successStoryRoutes.get('/:id', authMiddleware, async (req, res) => { await successStoryController.getById(req, res); });

/**
 * @swagger
 * /api/success-stories/{id}:
 *   put:
 *     summary: Actualizar una historia de éxito
 *     tags: [Historias de Éxito]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la historia de éxito
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               id_photo:
 *                 type: string
 *     responses:
 *       200:
 *         description: Historia de éxito actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/SuccessStory'
 *       404:
 *         description: Historia de éxito no encontrada
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
successStoryRoutes.put('/:id', authMiddleware, async (req, res) => { await successStoryController.update(req, res); });

/**
 * @swagger
 * /api/success-stories/creator/{creatorId}:
 *   get:
 *     summary: Obtener historias de éxito por ID de creador
 *     tags: [Historias de Éxito]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: creatorId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del creador de la historia de éxito
 *     responses:
 *       200:
 *         description: Lista de historias de éxito del creador
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SuccessStory'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
successStoryRoutes.get('/creator/:creatorId', authMiddleware, async (req, res) => { await successStoryController.getByCreatorId(req, res); });

export { successStoryRoutes };
import { Router } from 'express';
import { PhotoController } from '../controllers/PhotoController';
import { CreatePhotoUseCase } from '../../../application/use-cases/photo/CreatePhotoUseCase';
import { GetAllPhotosUseCase } from '../../../application/use-cases/photo/GetAllPhotosUseCase';
import { GetPhotoByIdUseCase } from '../../../application/use-cases/photo/GetPhotoByIdUseCase';
import { GetPhotosByCreatorIdUseCase } from '../../../application/use-cases/photo/GetPhotosByCreatorIdUseCase';
import { UpdatePhotoUseCase } from '../../../application/use-cases/photo/UpdatePhotoUseCase';
import { DeletePhotoUseCase } from '../../../application/use-cases/photo/DeletePhotoUseCase';
import { PrismaPhotoRepository } from '../../../infrastructure/repositories/PrismaPhotoRepository';
import { PrismaUserRepository } from '../../../infrastructure/repositories/PrismaUserRepository';
import { PrismaArchiveRepository } from '../../../infrastructure/repositories/PrismaArchiveRepository';
import { authMiddleware } from '../middlewares/authMiddleware';

const photoRoutes = Router();

// Dependencies
const photoRepository = new PrismaPhotoRepository();
const userRepository = new PrismaUserRepository();
const archiveRepository = new PrismaArchiveRepository();
const createPhotoUseCase = new CreatePhotoUseCase(
  photoRepository,
  userRepository,
  archiveRepository
);
const getAllPhotosUseCase = new GetAllPhotosUseCase(photoRepository);
const getPhotoByIdUseCase = new GetPhotoByIdUseCase(photoRepository);
const getPhotosByCreatorIdUseCase = new GetPhotosByCreatorIdUseCase(photoRepository);
const updatePhotoUseCase = new UpdatePhotoUseCase(photoRepository);
const deletePhotoUseCase = new DeletePhotoUseCase(photoRepository);

// Controller
const photoController = new PhotoController(
  createPhotoUseCase,
  getAllPhotosUseCase,
  getPhotoByIdUseCase,
  getPhotosByCreatorIdUseCase,
  updatePhotoUseCase,
  deletePhotoUseCase
);

// Routes

/**
 * @swagger
 * /api/photos:
 *   post:
 *     summary: Crear una nueva foto
 *     tags: [Fotos]
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
 *               - archiveId
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               creatorId:
 *                 type: string
 *               archiveId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Foto creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Photo'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 *   get:
 *     summary: Obtener todas las fotos
 *     tags: [Fotos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de fotos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Photo'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
photoRoutes.post('/', authMiddleware, async (req, res) => { await photoController.create(req, res); });
photoRoutes.get('/', authMiddleware, async (req, res) => { await photoController.getAll(req, res); });

/**
 * @swagger
 * /api/photos/{id}:
 *   get:
 *     summary: Obtener foto por ID
 *     tags: [Fotos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la foto
 *     responses:
 *       200:
 *         description: Foto encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Photo'
 *       404:
 *         description: Foto no encontrada
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
photoRoutes.get('/:id', authMiddleware, async (req, res) => { await photoController.getById(req, res); });

/**
 * @swagger
 * /api/photos/{id}:
 *   put:
 *     summary: Actualizar una foto
 *     tags: [Fotos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la foto
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
 *               id_archive:
 *                 type: string
 *     responses:
 *       200:
 *         description: Foto actualizada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Photo'
 *       404:
 *         description: Foto no encontrada
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
photoRoutes.put('/:id', authMiddleware, async (req, res) => { await photoController.update(req, res); });

/**
 * @swagger
 * /api/photos/creator/{creatorId}:
 *   get:
 *     summary: Obtener fotos por ID de creador
 *     tags: [Fotos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: creatorId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del creador de la foto
 *     responses:
 *       200:
 *         description: Lista de fotos del creador
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Photo'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
photoRoutes.get('/creator/:creatorId', authMiddleware, async (req, res) => { await photoController.getByCreatorId(req, res); });

/**
 * @swagger
 * /api/photos/{id}:
 *   delete:
 *     summary: Eliminar foto (eliminado lógico)
 *     tags: [Fotos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la foto
 *     responses:
 *       204:
 *         description: Foto eliminada exitosamente
 *       404:
 *         description: Foto no encontrada
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
photoRoutes.delete('/:id', authMiddleware, async (req, res) => { await photoController.delete(req, res); });

export { photoRoutes };
import { Router } from 'express';
import { FormatController } from '../controllers/FormatController';
import { CreateFormatUseCase } from '../../../application/use-cases/format/CreateFormatUseCase';
import { GetAllFormatsUseCase } from '../../../application/use-cases/format/GetAllFormatsUseCase';
import { GetFormatByIdUseCase } from '../../../application/use-cases/format/GetFormatByIdUseCase';
import { GetFormatsByCreatorIdUseCase } from '../../../application/use-cases/format/GetFormatsByCreatorIdUseCase';
import { UpdateFormatUseCase } from '../../../application/use-cases/format/UpdateFormatUseCase';
import { PrismaFormatRepository } from '../../../infrastructure/repositories/PrismaFormatRepository';
import { PrismaUserRepository } from '../../../infrastructure/repositories/PrismaUserRepository';
import { PrismaArchiveRepository } from '../../../infrastructure/repositories/PrismaArchiveRepository';
import { authMiddleware } from '../middlewares/authMiddleware';

const formatRoutes = Router();

// Dependencies
const formatRepository = new PrismaFormatRepository();
const userRepository = new PrismaUserRepository();
const archiveRepository = new PrismaArchiveRepository();
const createFormatUseCase = new CreateFormatUseCase(
  formatRepository,
  userRepository,
  archiveRepository
);
const getAllFormatsUseCase = new GetAllFormatsUseCase(formatRepository);
const getFormatByIdUseCase = new GetFormatByIdUseCase(formatRepository);
const getFormatsByCreatorIdUseCase = new GetFormatsByCreatorIdUseCase(formatRepository);
const updateFormatUseCase = new UpdateFormatUseCase(formatRepository);

// Controller
const formatController = new FormatController(
  createFormatUseCase,
  getAllFormatsUseCase,
  getFormatByIdUseCase,
  getFormatsByCreatorIdUseCase,
  updateFormatUseCase
);

// Routes

/**
 * @swagger
 * /api/formats:
 *   post:
 *     summary: Crear un nuevo formato
 *     tags: [Formatos]
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
 *         description: Formato creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Format'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 *   get:
 *     summary: Obtener todos los formatos
 *     tags: [Formatos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de formatos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Format'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
formatRoutes.post('/', authMiddleware, async (req, res) => { await formatController.create(req, res); });
formatRoutes.get('/', authMiddleware, async (req, res) => { await formatController.getAll(req, res); });

/**
 * @swagger
 * /api/formats/{id}:
 *   get:
 *     summary: Obtener formato por ID
 *     tags: [Formatos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del formato
 *     responses:
 *       200:
 *         description: Formato encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Format'
 *       404:
 *         description: Formato no encontrado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
formatRoutes.get('/:id', authMiddleware, async (req, res) => { await formatController.getById(req, res); });

/**
 * @swagger
 * /api/formats/{id}:
 *   put:
 *     summary: Actualizar un formato
 *     tags: [Formatos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del formato
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
 *         description: Formato actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Format'
 *       404:
 *         description: Formato no encontrado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
formatRoutes.put('/:id', authMiddleware, async (req, res) => { await formatController.update(req, res); });

/**
 * @swagger
 * /api/formats/creator/{creatorId}:
 *   get:
 *     summary: Obtener formatos por ID de creador
 *     tags: [Formatos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: creatorId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del creador del formato
 *     responses:
 *       200:
 *         description: Lista de formatos del creador
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Format'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
formatRoutes.get('/creator/:creatorId', authMiddleware, async (req, res) => { await formatController.getByCreatorId(req, res); });

export { formatRoutes };
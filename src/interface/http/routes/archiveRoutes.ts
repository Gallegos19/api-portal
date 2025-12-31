import { Router } from 'express';
import { ArchiveController } from '../controllers/ArchiveController';
import { CreateArchiveUseCase } from '../../../application/use-cases/archive/CreateArchiveUseCase';
import { GetAllArchivesUseCase } from '../../../application/use-cases/archive/GetAllArchivesUseCase';
import { GetArchiveByIdUseCase } from '../../../application/use-cases/archive/GetArchiveByIdUseCase';
import { GetArchivesByUploaderUserIdUseCase } from '../../../application/use-cases/archive/GetArchivesByUploaderUserIdUseCase';
import { GetArchivesByFileTypeUseCase } from '../../../application/use-cases/archive/GetArchivesByFileTypeUseCase';
import { UpdateArchiveUseCase } from '../../../application/use-cases/archive/UpdateArchiveUseCase';
import { DeleteArchiveUseCase } from '../../../application/use-cases/archive/DeleteArchiveUseCase';
import { PrismaArchiveRepository } from '../../../infrastructure/repositories/PrismaArchiveRepository';
import { PrismaUserRepository } from '../../../infrastructure/repositories/PrismaUserRepository';
import { authMiddleware } from '../middlewares/authMiddleware';

const archiveRoutes = Router();

// Dependencies
const archiveRepository = new PrismaArchiveRepository();
const userRepository = new PrismaUserRepository();
const createArchiveUseCase = new CreateArchiveUseCase(
  archiveRepository,
  userRepository
);
const getAllArchivesUseCase = new GetAllArchivesUseCase(archiveRepository);
const getArchiveByIdUseCase = new GetArchiveByIdUseCase(archiveRepository);
const getArchivesByUploaderUserIdUseCase = new GetArchivesByUploaderUserIdUseCase(archiveRepository);
const getArchivesByFileTypeUseCase = new GetArchivesByFileTypeUseCase(archiveRepository);
const updateArchiveUseCase = new UpdateArchiveUseCase(archiveRepository);
const deleteArchiveUseCase = new DeleteArchiveUseCase(archiveRepository);

// Controller
const archiveController = new ArchiveController(
  createArchiveUseCase,
  getAllArchivesUseCase,
  getArchiveByIdUseCase,
  getArchivesByUploaderUserIdUseCase,
  getArchivesByFileTypeUseCase,
  updateArchiveUseCase,
  deleteArchiveUseCase
);

// Routes

/**
 * @swagger
 * /api/archives:
 *   post:
 *     summary: Crear un nuevo archivo
 *     tags: [Archivos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - fileName
 *               - fileType
 *               - fileUrl
 *               - uploaderUserId
 *             properties:
 *               fileName:
 *                 type: string
 *               fileType:
 *                 type: string
 *               fileUrl:
 *                 type: string
 *               uploaderUserId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Archivo creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Archive'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 *   get:
 *     summary: Obtener todos los archivos
 *     tags: [Archivos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de archivos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Archive'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
archiveRoutes.post('/', authMiddleware, async (req, res) => { await archiveController.create(req, res); });
archiveRoutes.get('/', authMiddleware, async (req, res) => { await archiveController.getAll(req, res); });

/**
 * @swagger
 * /api/archives/{id}:
 *   get:
 *     summary: Obtener archivo por ID
 *     tags: [Archivos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del archivo
 *     responses:
 *       200:
 *         description: Archivo encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Archive'
 *       404:
 *         description: Archivo no encontrado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
archiveRoutes.get('/:id', authMiddleware, async (req, res) => { await archiveController.getById(req, res); });

/**
 * @swagger
 * /api/archives/{id}:
 *   put:
 *     summary: Actualizar un archivo
 *     tags: [Archivos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del archivo
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               file_name:
 *                 type: string
 *               file_type:
 *                 type: string
 *               mime_type:
 *                 type: string
 *               storage_url:
 *                 type: string
 *     responses:
 *       200:
 *         description: Archivo actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Archive'
 *       404:
 *         description: Archivo no encontrado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
archiveRoutes.put('/:id', authMiddleware, async (req, res) => { await archiveController.update(req, res); });

/**
 * @swagger
 * /api/archives/uploader/{userId}:
 *   get:
 *     summary: Obtener archivos por ID de usuario que los subió
 *     tags: [Archivos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: userId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del usuario que subió el archivo
 *     responses:
 *       200:
 *         description: Lista de archivos del usuario
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Archive'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
archiveRoutes.get('/uploader/:userId', authMiddleware, async (req, res) => { await archiveController.getByUploaderUserId(req, res); });

/**
 * @swagger
 * /api/archives/type/{fileType}:
 *   get:
 *     summary: Obtener archivos por tipo de archivo
 *     tags: [Archivos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: fileType
 *         required: true
 *         schema:
 *           type: string
 *         description: Tipo de archivo
 *     responses:
 *       200:
 *         description: Lista de archivos del tipo especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Archive'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
archiveRoutes.get('/type/:fileType', authMiddleware, async (req, res) => { await archiveController.getByFileType(req, res); });

/**
 * @swagger
 * /api/archives/{id}:
 *   delete:
 *     summary: Eliminar archivo (eliminado lógico)
 *     tags: [Archivos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del archivo
 *     responses:
 *       204:
 *         description: Archivo eliminado exitosamente
 *       404:
 *         description: Archivo no encontrado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
archiveRoutes.delete('/:id', authMiddleware, async (req, res) => { await archiveController.delete(req, res); });

export { archiveRoutes };
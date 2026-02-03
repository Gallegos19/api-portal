import { Router } from 'express';
import multer from 'multer';
import { ArchiveController } from '../controllers/ArchiveController';
import { CreateArchiveUseCase } from '../../../application/use-cases/archive/CreateArchiveUseCase';
import { GetAllArchivesUseCase } from '../../../application/use-cases/archive/GetAllArchivesUseCase';
import { GetArchiveByIdUseCase } from '../../../application/use-cases/archive/GetArchiveByIdUseCase';
import { GetArchivesByUploaderUserIdUseCase } from '../../../application/use-cases/archive/GetArchivesByUploaderUserIdUseCase';
import { GetArchivesByFileTypeUseCase } from '../../../application/use-cases/archive/GetArchivesByFileTypeUseCase';
import { UpdateArchiveUseCase } from '../../../application/use-cases/archive/UpdateArchiveUseCase';
import { DeleteArchiveUseCase } from '../../../application/use-cases/archive/DeleteArchiveUseCase';
import { GetArchiveSignedUrlUseCase } from '../../../application/use-cases/archive/GetArchiveSignedUrlUseCase';
import { PrismaArchiveRepository } from '../../../infrastructure/repositories/PrismaArchiveRepository';
import { PrismaUserRepository } from '../../../infrastructure/repositories/PrismaUserRepository';
import { authMiddleware } from '../middlewares/authMiddleware';
import { storageService } from '../../../shared/config/storage';

const archiveRoutes = Router();

// Configurar Multer para almacenar archivos en memoria
const upload = multer({ 
  storage: multer.memoryStorage(),
  limits: {
    fileSize: 50 * 1024 * 1024, // Límite de 50MB
  }
});

// Dependencies
const archiveRepository = new PrismaArchiveRepository();
const userRepository = new PrismaUserRepository();
const createArchiveUseCase = new CreateArchiveUseCase(
  archiveRepository,
  userRepository,
  storageService
);
const getAllArchivesUseCase = new GetAllArchivesUseCase(archiveRepository);
const getArchiveByIdUseCase = new GetArchiveByIdUseCase(archiveRepository);
const getArchivesByUploaderUserIdUseCase = new GetArchivesByUploaderUserIdUseCase(archiveRepository);
const getArchivesByFileTypeUseCase = new GetArchivesByFileTypeUseCase(archiveRepository);
const updateArchiveUseCase = new UpdateArchiveUseCase(archiveRepository);
const deleteArchiveUseCase = new DeleteArchiveUseCase(archiveRepository);
const getArchiveSignedUrlUseCase = new GetArchiveSignedUrlUseCase(
  archiveRepository,
  storageService
);

// Controller
const archiveController = new ArchiveController(
  createArchiveUseCase,
  getAllArchivesUseCase,
  getArchiveByIdUseCase,
  getArchivesByUploaderUserIdUseCase,
  getArchivesByFileTypeUseCase,
  updateArchiveUseCase,
  deleteArchiveUseCase,
  getArchiveSignedUrlUseCase
);

// Routes

/**
 * @swagger
 * /api/archives:
 *   post:
 *     summary: Subir un nuevo archivo
 *     tags: [Archivos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             required:
 *               - file
 *               - uploaded_by
 *             properties:
 *               file:
 *                 type: string
 *                 format: binary
 *                 description: Archivo a subir
 *               file_type:
 *                 type: string
 *                 description: Tipo de archivo (ej. 'documento', 'imagen', etc.)
 *               folder:
 *                 type: string
 *                 description: Carpeta donde almacenar (ej. 'documentos', 'fotos')
 *                 default: archives
 *               uploaded_by:
 *                 type: string
 *                 description: ID del usuario que sube el archivo
 *     responses:
 *       201:
 *         description: Archivo creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Archive'
 *       400:
 *         description: No se proporcionó archivo o datos inválidos
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
archiveRoutes.post('/', authMiddleware, upload.single('file'), async (req, res) => { await archiveController.create(req, res); });
archiveRoutes.get('/', authMiddleware, async (req, res) => { await archiveController.getAll(req, res); });

/**
 * @swagger
 * /api/archives/{id}/signed-url:
 *   get:
 *     summary: Obtener URL firmada para acceder al archivo
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
 *       - in: query
 *         name: expiresIn
 *         schema:
 *           type: integer
 *           default: 3600
 *         description: Tiempo de expiración en segundos (default 3600 = 1 hora)
 *     responses:
 *       200:
 *         description: URL firmada generada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 signed_url:
 *                   type: string
 *                   description: URL firmada con acceso temporal
 *                 expires_in:
 *                   type: integer
 *                   description: Tiempo de expiración en segundos
 *       404:
 *         description: Archivo no encontrado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
archiveRoutes.get('/:id/signed-url', authMiddleware, async (req, res) => { await archiveController.getSignedUrl(req, res); });

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
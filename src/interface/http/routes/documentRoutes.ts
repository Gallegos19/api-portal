import { Router } from 'express';
import { DocumentController } from '../controllers/DocumentController';
import { CreateDocumentUseCase } from '../../../application/use-cases/document/CreateDocumentUseCase';
import { GetAllDocumentsUseCase } from '../../../application/use-cases/document/GetAllDocumentsUseCase';
import { GetDocumentByIdUseCase } from '../../../application/use-cases/document/GetDocumentByIdUseCase';
import { GetDocumentsByInternIdUseCase } from '../../../application/use-cases/document/GetDocumentsByInternIdUseCase';
import { PrismaDocumentRepository } from '../../../infrastructure/repositories/PrismaDocumentRepository';
import { authMiddleware } from '../middlewares/authMiddleware';

const documentRoutes = Router();

// Dependencies
const documentRepository = new PrismaDocumentRepository();
const createDocumentUseCase = new CreateDocumentUseCase(documentRepository);
const getAllDocumentsUseCase = new GetAllDocumentsUseCase(documentRepository);
const getDocumentByIdUseCase = new GetDocumentByIdUseCase(documentRepository);
const getDocumentsByInternIdUseCase = new GetDocumentsByInternIdUseCase(documentRepository);

// Controller
const documentController = new DocumentController(
  createDocumentUseCase,
  getAllDocumentsUseCase,
  getDocumentByIdUseCase,
  getDocumentsByInternIdUseCase
);

// Routes

/**
 * @swagger
 * /api/documents:
 *   post:
 *     summary: Crear un nuevo documento
 *     tags: [Documentos]
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
 *               - internId
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               internId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Documento creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Document'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 *   get:
 *     summary: Obtener todos los documentos
 *     tags: [Documentos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de documentos
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Document'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
documentRoutes.post('/', authMiddleware, async (req, res) => { await documentController.create(req, res); });
documentRoutes.get('/', authMiddleware, async (req, res) => { await documentController.getAll(req, res); });

/**
 * @swagger
 * /api/documents/{id}:
 *   get:
 *     summary: Obtener documento por ID
 *     tags: [Documentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del documento
 *     responses:
 *       200:
 *         description: Documento encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Document'
 *       404:
 *         description: Documento no encontrado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
documentRoutes.get('/:id', authMiddleware, async (req, res) => { await documentController.getById(req, res); });

/**
 * @swagger
 * /api/documents/intern/{internId}:
 *   get:
 *     summary: Obtener documentos por ID de interno
 *     tags: [Documentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: internId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del interno
 *     responses:
 *       200:
 *         description: Lista de documentos del interno
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Document'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
documentRoutes.get('/intern/:internId', authMiddleware, async (req, res) => { await documentController.getByInternId(req, res); });

export { documentRoutes };
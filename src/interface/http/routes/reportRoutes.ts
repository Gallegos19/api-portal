import { Router } from 'express';
import { ReportController } from '../controllers/ReportController';
import { CreateReportUseCase } from '../../../application/use-cases/report/CreateReportUseCase';
import { GetAllReportsUseCase } from '../../../application/use-cases/report/GetAllReportsUseCase';
import { GetReportByIdUseCase } from '../../../application/use-cases/report/GetReportByIdUseCase';
import { GetReportsByCreatorIdUseCase } from '../../../application/use-cases/report/GetReportsByCreatorIdUseCase';
import { GetReportsByTypeUseCase } from '../../../application/use-cases/report/GetReportsByTypeUseCase';
import { UpdateReportUseCase } from '../../../application/use-cases/report/UpdateReportUseCase';
import { PrismaReportRepository } from '../../../infrastructure/repositories/PrismaReportRepository';
import { PrismaUserRepository } from '../../../infrastructure/repositories/PrismaUserRepository';
import { PrismaArchiveRepository } from '../../../infrastructure/repositories/PrismaArchiveRepository';
import { authMiddleware } from '../middlewares/authMiddleware';

const reportRoutes = Router();

// Dependencies
const reportRepository = new PrismaReportRepository();
const userRepository = new PrismaUserRepository();
const archiveRepository = new PrismaArchiveRepository();
const createReportUseCase = new CreateReportUseCase(
  reportRepository,
  userRepository,
  archiveRepository
);
const getAllReportsUseCase = new GetAllReportsUseCase(reportRepository);
const getReportByIdUseCase = new GetReportByIdUseCase(reportRepository);
const getReportsByCreatorIdUseCase = new GetReportsByCreatorIdUseCase(reportRepository);
const getReportsByTypeUseCase = new GetReportsByTypeUseCase(reportRepository);
const updateReportUseCase = new UpdateReportUseCase(reportRepository);

// Controller
const reportController = new ReportController(
  createReportUseCase,
  getAllReportsUseCase,
  getReportByIdUseCase,
  getReportsByCreatorIdUseCase,
  getReportsByTypeUseCase,
  updateReportUseCase
);

// Routes

/**
 * @swagger
 * /api/reports:
 *   post:
 *     summary: Crear un nuevo reporte
 *     tags: [Reportes]
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
 *               - type
 *               - creatorId
 *               - archiveId
 *             properties:
 *               title:
 *                 type: string
 *               type:
 *                 type: string
 *               creatorId:
 *                 type: string
 *               archiveId:
 *                 type: string
 *     responses:
 *       201:
 *         description: Reporte creado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Report'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 *   get:
 *     summary: Obtener todos los reportes
 *     tags: [Reportes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de reportes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Report'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
reportRoutes.post('/', authMiddleware, async (req, res) => { await reportController.create(req, res); });
reportRoutes.get('/', authMiddleware, async (req, res) => { await reportController.getAll(req, res); });

/**
 * @swagger
 * /api/reports/{id}:
 *   get:
 *     summary: Obtener reporte por ID
 *     tags: [Reportes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del reporte
 *     responses:
 *       200:
 *         description: Reporte encontrado
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Report'
 *       404:
 *         description: Reporte no encontrado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
reportRoutes.get('/:id', authMiddleware, async (req, res) => { await reportController.getById(req, res); });

/**
 * @swagger
 * /api/reports/{id}:
 *   put:
 *     summary: Actualizar un reporte
 *     tags: [Reportes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del reporte
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
 *               type:
 *                 type: string
 *               id_archive:
 *                 type: string
 *     responses:
 *       200:
 *         description: Reporte actualizado exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Report'
 *       404:
 *         description: Reporte no encontrado
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
reportRoutes.put('/:id', authMiddleware, async (req, res) => { await reportController.update(req, res); });

/**
 * @swagger
 * /api/reports/creator/{creatorId}:
 *   get:
 *     summary: Obtener reportes por ID de creador
 *     tags: [Reportes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: creatorId
 *         required: true
 *         schema:
 *           type: string
 *         description: ID del creador del reporte
 *     responses:
 *       200:
 *         description: Lista de reportes del creador
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Report'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
reportRoutes.get('/creator/:creatorId', authMiddleware, async (req, res) => { await reportController.getByCreatorId(req, res); });

/**
 * @swagger
 * /api/reports/type/{type}:
 *   get:
 *     summary: Obtener reportes por tipo
 *     tags: [Reportes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: type
 *         required: true
 *         schema:
 *           type: string
 *         description: Tipo de reporte
 *     responses:
 *       200:
 *         description: Lista de reportes del tipo especificado
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Report'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
reportRoutes.get('/type/:type', authMiddleware, async (req, res) => { await reportController.getByType(req, res); });

export { reportRoutes };
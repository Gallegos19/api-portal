import { Router } from 'express';
import { RegionController } from '../controllers/RegionController';
import { CreateRegionUseCase } from '../../../application/use-cases/region/CreateRegionUseCase';
import { GetAllRegionsUseCase } from '../../../application/use-cases/region/GetAllRegionsUseCase';
import { GetRegionByIdUseCase } from '../../../application/use-cases/region/GetRegionByIdUseCase';
import { UpdateRegionUseCase } from '../../../application/use-cases/region/UpdateRegionUseCase';
import { DeleteRegionUseCase } from '../../../application/use-cases/region/DeleteRegionUseCase';
import { PrismaRegionRepository } from '../../../infrastructure/repositories/PrismaRegionRepository';
import { authMiddleware } from '../middlewares/authMiddleware';

const regionRoutes = Router();

// Dependencies
const regionRepository = new PrismaRegionRepository();
const createRegionUseCase = new CreateRegionUseCase(regionRepository);
const getAllRegionsUseCase = new GetAllRegionsUseCase(regionRepository);
const getRegionByIdUseCase = new GetRegionByIdUseCase(regionRepository);
const updateRegionUseCase = new UpdateRegionUseCase(regionRepository);
const deleteRegionUseCase = new DeleteRegionUseCase(regionRepository);

// Controller
const regionController = new RegionController(
  createRegionUseCase,
  getAllRegionsUseCase,
  getRegionByIdUseCase,
  updateRegionUseCase,
  deleteRegionUseCase
);

// Routes

/**
 * @swagger
 * /api/regions:
 *   post:
 *     summary: Crear una nueva región
 *     tags: [Regiones]
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
 *             properties:
 *               name:
 *                 type: string
 *                 example: Región Norte
 *               description:
 *                 type: string
 *                 example: Región del norte del país
 *     responses:
 *       201:
 *         description: Región creada exitosamente
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Region'
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 *   get:
 *     summary: Obtener todas las regiones
 *     tags: [Regiones]
 *     responses:
 *       200:
 *         description: Lista de regiones
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Region'
 *       500:
 *         description: Error del servidor
 */
regionRoutes.post('/', authMiddleware, async (req, res) => { await regionController.create(req, res); });
regionRoutes.get('/', async (req, res) => { await regionController.getAll(req, res); });

/**
 * @swagger
 * /api/regions/{id}:
 *   get:
 *     summary: Obtener región por ID
 *     tags: [Regiones]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la región
 *     responses:
 *       200:
 *         description: Región encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Region'
 *       404:
 *         description: Región no encontrada
 *       500:
 *         description: Error del servidor
 */
regionRoutes.get('/:id', async (req, res) => { await regionController.getById(req, res); });

/**
 * @swagger
 * /api/regions/{id}:
 *   put:
 *     summary: Actualizar una región
 *     tags: [Regiones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la región
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name_region:
 *                 type: string
 *     responses:
 *       200:
 *         description: Región actualizada exitosamente
 *       404:
 *         description: Región no encontrada
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
regionRoutes.put('/:id', authMiddleware, async (req, res) => { await regionController.update(req, res); });

/**
 * @swagger
 * /api/regions/{id}:
 *   delete:
 *     summary: Eliminar región (eliminado lógico)
 *     tags: [Regiones]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID de la región
 *     responses:
 *       204:
 *         description: Región eliminada exitosamente
 *       404:
 *         description: Región no encontrada
 *       401:
 *         description: No autorizado
 *       500:
 *         description: Error del servidor
 */
regionRoutes.delete('/:id', authMiddleware, async (req, res) => { await regionController.delete(req, res); });

export { regionRoutes };
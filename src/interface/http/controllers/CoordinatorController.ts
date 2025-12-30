import { Request, Response } from 'express';
import { CreateCoordinatorUseCase } from '../../../application/use-cases/coordinator/CreateCoordinatorUseCase';
import { GetAllCoordinatorsUseCase } from '../../../application/use-cases/coordinator/GetAllCoordinatorsUseCase';
import { GetCoordinatorByIdUseCase } from '../../../application/use-cases/coordinator/GetCoordinatorByIdUseCase';
import { GetCoordinatorByUserIdUseCase } from '../../../application/use-cases/coordinator/GetCoordinatorByUserIdUseCase';
import { UpdateCoordinatorUseCase } from '../../../application/use-cases/coordinator/UpdateCoordinatorUseCase';
import { ResourceNotFoundError } from '../../../shared/errors/CustomErrors';

export class CoordinatorController {
  constructor(
    private readonly createCoordinatorUseCase: CreateCoordinatorUseCase,
    private readonly getAllCoordinatorsUseCase: GetAllCoordinatorsUseCase,
    private readonly getCoordinatorByIdUseCase: GetCoordinatorByIdUseCase,
    private readonly getCoordinatorByUserIdUseCase: GetCoordinatorByUserIdUseCase,
    private readonly updateCoordinatorUseCase: UpdateCoordinatorUseCase
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { id_user, id_region } = req.body;

      const coordinator = await this.createCoordinatorUseCase.execute({
        id_user,
        id_region
      });

      return res.status(201).json({
        id: coordinator.id,
        id_user: coordinator.userId,
        id_region: coordinator.regionId
      });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      
      if (error instanceof Error) {
        if (error.message.includes('already a coordinator')) {
          return res.status(409).json({ message: error.message });
        }
      }
      
      console.error('Error creating coordinator:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const coordinators = await this.getAllCoordinatorsUseCase.execute();
      
      return res.status(200).json(coordinators.map(coordinator => ({
        id: coordinator.id,
        id_user: coordinator.userId,
        id_region: coordinator.regionId
      })));
    } catch (error) {
      console.error('Error getting coordinators:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const coordinator = await this.getCoordinatorByIdUseCase.execute(id);
      
      return res.status(200).json({
        id: coordinator.id,
        id_user: coordinator.userId,
        id_region: coordinator.regionId
      });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      console.error('Error getting coordinator:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getByUserId(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params;
      const coordinator = await this.getCoordinatorByUserIdUseCase.execute(userId);
      
      return res.status(200).json({
        id: coordinator.id,
        id_user: coordinator.userId,
        id_region: coordinator.regionId
      });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      console.error('Error getting coordinator by user ID:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { id_user, id_region } = req.body;

      const coordinator = await this.updateCoordinatorUseCase.execute(id, {
        id_user,
        id_region
      });

      return res.status(200).json({
        id: coordinator.id,
        id_user: coordinator.userId,
        id_region: coordinator.regionId
      });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      console.error('Error updating coordinator:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
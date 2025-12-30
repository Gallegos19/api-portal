import { Request, Response } from 'express';
import { CreateSubprojectUseCase } from '../../../application/use-cases/subproject/CreateSubprojectUseCase';
import { GetAllSubprojectsUseCase } from '../../../application/use-cases/subproject/GetAllSubprojectsUseCase';
import { GetSubprojectByIdUseCase } from '../../../application/use-cases/subproject/GetSubprojectByIdUseCase';
import { GetSubprojectsByRegionIdUseCase } from '../../../application/use-cases/subproject/GetSubprojectsByRegionIdUseCase';
import { UpdateSubprojectUseCase } from '../../../application/use-cases/subproject/UpdateSubprojectUseCase';
import { ResourceNotFoundError } from '../../../shared/errors/CustomErrors';

export class SubprojectController {
  constructor(
    private readonly createSubprojectUseCase: CreateSubprojectUseCase,
    private readonly getAllSubprojectsUseCase: GetAllSubprojectsUseCase,
    private readonly getSubprojectByIdUseCase: GetSubprojectByIdUseCase,
    private readonly getSubprojectsByRegionIdUseCase: GetSubprojectsByRegionIdUseCase,
    private readonly updateSubprojectUseCase: UpdateSubprojectUseCase
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name_subproject, id_region, id_social_facilitator, id_coordinator } = req.body;

      const subproject = await this.createSubprojectUseCase.execute({
        name_subproject,
        id_region,
        id_social_facilitator,
        id_coordinator
      });

      return res.status(201).json({
        id: subproject.id,
        name_subproject: subproject.nameSubproject,
        id_region: subproject.regionId,
        id_social_facilitator: subproject.socialFacilitatorId,
        id_coordinator: subproject.coordinatorId
      });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      
      if (error instanceof Error) {
        if (error.message.includes('already assigned')) {
          return res.status(409).json({ message: error.message });
        }
      }
      
      console.error('Error creating subproject:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const subprojects = await this.getAllSubprojectsUseCase.execute();
      
      return res.status(200).json(subprojects.map(subproject => ({
        id: subproject.id,
        name_subproject: subproject.nameSubproject,
        id_region: subproject.regionId,
        id_social_facilitator: subproject.socialFacilitatorId,
        id_coordinator: subproject.coordinatorId
      })));
    } catch (error) {
      console.error('Error getting subprojects:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const subproject = await this.getSubprojectByIdUseCase.execute(id);
      
      return res.status(200).json({
        id: subproject.id,
        name_subproject: subproject.nameSubproject,
        id_region: subproject.regionId,
        id_social_facilitator: subproject.socialFacilitatorId,
        id_coordinator: subproject.coordinatorId
      });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      console.error('Error getting subproject:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getByRegionId(req: Request, res: Response): Promise<Response> {
    try {
      const { regionId } = req.params;
      const subprojects = await this.getSubprojectsByRegionIdUseCase.execute(regionId);
      
      return res.status(200).json(subprojects.map(subproject => ({
        id: subproject.id,
        name_subproject: subproject.nameSubproject,
        id_region: subproject.regionId,
        id_social_facilitator: subproject.socialFacilitatorId,
        id_coordinator: subproject.coordinatorId
      })));
    } catch (error) {
      console.error('Error getting subprojects by region ID:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { name_subproject, id_region, id_social_facilitator, id_coordinator } = req.body;

      const subproject = await this.updateSubprojectUseCase.execute(id, {
        name_subproject,
        id_region,
        id_social_facilitator,
        id_coordinator
      });

      return res.status(200).json({
        id: subproject.id,
        name_subproject: subproject.nameSubproject,
        id_region: subproject.regionId,
        id_social_facilitator: subproject.socialFacilitatorId,
        id_coordinator: subproject.coordinatorId
      });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      console.error('Error updating subproject:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
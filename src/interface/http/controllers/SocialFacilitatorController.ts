import { Request, Response } from 'express';
import { CreateSocialFacilitatorUseCase } from '../../../application/use-cases/socialFacilitator/CreateSocialFacilitatorUseCase';
import { GetAllSocialFacilitatorsUseCase } from '../../../application/use-cases/socialFacilitator/GetAllSocialFacilitatorsUseCase';
import { GetSocialFacilitatorByIdUseCase } from '../../../application/use-cases/socialFacilitator/GetSocialFacilitatorByIdUseCase';
import { GetSocialFacilitatorByUserIdUseCase } from '../../../application/use-cases/socialFacilitator/GetSocialFacilitatorByUserIdUseCase';
import { GetSocialFacilitatorsBySubprojectIdUseCase } from '../../../application/use-cases/socialFacilitator/GetSocialFacilitatorsBySubprojectIdUseCase';
import { UpdateSocialFacilitatorUseCase } from '../../../application/use-cases/socialFacilitator/UpdateSocialFacilitatorUseCase';
import { DeleteSocialFacilitatorUseCase } from '../../../application/use-cases/socialFacilitator/DeleteSocialFacilitatorUseCase';
import { ResourceNotFoundError } from '../../../shared/errors/CustomErrors';

export class SocialFacilitatorController {
  constructor(
    private readonly createSocialFacilitatorUseCase: CreateSocialFacilitatorUseCase,
    private readonly getAllSocialFacilitatorsUseCase: GetAllSocialFacilitatorsUseCase,
    private readonly getSocialFacilitatorByIdUseCase: GetSocialFacilitatorByIdUseCase,
    private readonly getSocialFacilitatorByUserIdUseCase: GetSocialFacilitatorByUserIdUseCase,
    private readonly getSocialFacilitatorsBySubprojectIdUseCase: GetSocialFacilitatorsBySubprojectIdUseCase,
    private readonly updateSocialFacilitatorUseCase: UpdateSocialFacilitatorUseCase,
    private readonly deleteSocialFacilitatorUseCase: DeleteSocialFacilitatorUseCase
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { id_user, id_region } = req.body;

      const socialFacilitator = await this.createSocialFacilitatorUseCase.execute({
        id_user,
        id_region
      });

      return res.status(201).json({
        id: socialFacilitator.id,
        id_user: socialFacilitator.userId,
        id_region: socialFacilitator.regionId
      });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      
      if (error instanceof Error) {
        if (error.message.includes('already a social facilitator')) {
          return res.status(409).json({ message: error.message });
        }
      }
      
      console.error('Error creating social facilitator:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const socialFacilitators = await this.getAllSocialFacilitatorsUseCase.execute();
      
      return res.status(200).json(socialFacilitators.map(sf => ({
        id: sf.id,
        id_user: sf.userId,
        id_region: sf.regionId
      })));
    } catch (error) {
      console.error('Error getting social facilitators:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const socialFacilitator = await this.getSocialFacilitatorByIdUseCase.execute(id);
      
      return res.status(200).json({
        id: socialFacilitator.id,
        id_user: socialFacilitator.userId,
        id_region: socialFacilitator.regionId
      });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      console.error('Error getting social facilitator:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getByUserId(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params;
      const socialFacilitator = await this.getSocialFacilitatorByUserIdUseCase.execute(userId);
      
      return res.status(200).json({
        id: socialFacilitator.id,
        id_user: socialFacilitator.userId,
        id_region: socialFacilitator.regionId
      });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      console.error('Error getting social facilitator by user ID:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getBySubprojectId(req: Request, res: Response): Promise<Response> {
    try {
      const { subprojectId } = req.params;
      const socialFacilitators = await this.getSocialFacilitatorsBySubprojectIdUseCase.execute(subprojectId);
      
      return res.status(200).json(socialFacilitators.map(sf => ({
        id: sf.id,
        id_user: sf.userId,
        id_region: sf.regionId
      })));
    } catch (error) {
      console.error('Error getting social facilitators by subproject ID:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { id_user, id_region } = req.body;

      const socialFacilitator = await this.updateSocialFacilitatorUseCase.execute(id, {
        id_user,
        id_region
      });

      return res.status(200).json({
        id: socialFacilitator.id,
        id_user: socialFacilitator.userId,
        id_region: socialFacilitator.regionId
      });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      console.error('Error updating social facilitator:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await this.deleteSocialFacilitatorUseCase.execute(id);
      return res.status(204).send();
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      console.error('Error deleting social facilitator:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
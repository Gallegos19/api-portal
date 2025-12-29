import { Request, Response } from 'express';
import { CreateRegionUseCase } from '../../../application/use-cases/region/CreateRegionUseCase';
import { GetAllRegionsUseCase } from '../../../application/use-cases/region/GetAllRegionsUseCase';
import { GetRegionByIdUseCase } from '../../../application/use-cases/region/GetRegionByIdUseCase';
import { ResourceNotFoundError } from '../../../shared/errors/CustomErrors';

export class RegionController {
  constructor(
    private readonly createRegionUseCase: CreateRegionUseCase,
    private readonly getAllRegionsUseCase: GetAllRegionsUseCase,
    private readonly getRegionByIdUseCase: GetRegionByIdUseCase
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { name_region } = req.body;

      const region = await this.createRegionUseCase.execute({
        name_region
      });

      return res.status(201).json({
        id: region.id,
        name_region: region.nameRegion
      });
    } catch (error) {
      if (error instanceof Error) {
        if (error.message.includes('already exists')) {
          return res.status(409).json({ message: error.message });
        }
      }
      
      console.error('Error creating region:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const regions = await this.getAllRegionsUseCase.execute();
      
      return res.status(200).json(regions.map(region => ({
        id: region.id,
        name_region: region.nameRegion
      })));
    } catch (error) {
      console.error('Error getting regions:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const region = await this.getRegionByIdUseCase.execute(id);
      
      return res.status(200).json({
        id: region.id,
        name_region: region.nameRegion
      });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      console.error('Error getting region:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
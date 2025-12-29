import { Request, Response } from 'express';
import { CreateFormatUseCase } from '../../../application/use-cases/format/CreateFormatUseCase';
import { GetAllFormatsUseCase } from '../../../application/use-cases/format/GetAllFormatsUseCase';
import { GetFormatByIdUseCase } from '../../../application/use-cases/format/GetFormatByIdUseCase';
import { GetFormatsByCreatorIdUseCase } from '../../../application/use-cases/format/GetFormatsByCreatorIdUseCase';
import { ResourceNotFoundError } from '../../../shared/errors/CustomErrors';

export class FormatController {
  constructor(
    private readonly createFormatUseCase: CreateFormatUseCase,
    private readonly getAllFormatsUseCase: GetAllFormatsUseCase,
    private readonly getFormatByIdUseCase: GetFormatByIdUseCase,
    private readonly getFormatsByCreatorIdUseCase: GetFormatsByCreatorIdUseCase
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { title, description, id_archive } = req.body;

      const format = await this.createFormatUseCase.execute({
        title,
        description,
        id_archive,
        created_by: req.user?.userId || '' // Use authenticated user
      });

      return res.status(201).json({
        id: format.id,
        title: format.title,
        description: format.description,
        id_archive: format.archiveId,
        created_at: format.createdAt,
        created_by: format.createdBy
      });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      
      console.error('Error creating format:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const formats = await this.getAllFormatsUseCase.execute();
      
      return res.status(200).json(formats.map(format => ({
        id: format.id,
        title: format.title,
        description: format.description,
        id_archive: format.archiveId,
        created_at: format.createdAt,
        created_by: format.createdBy
      })));
    } catch (error) {
      console.error('Error getting formats:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const format = await this.getFormatByIdUseCase.execute(id);
      
      return res.status(200).json({
        id: format.id,
        title: format.title,
        description: format.description,
        id_archive: format.archiveId,
        created_at: format.createdAt,
        created_by: format.createdBy
      });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      console.error('Error getting format:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getByCreatorId(req: Request, res: Response): Promise<Response> {
    try {
      const { creatorId } = req.params;
      const formats = await this.getFormatsByCreatorIdUseCase.execute(creatorId);
      
      return res.status(200).json(formats.map(format => ({
        id: format.id,
        title: format.title,
        description: format.description,
        id_archive: format.archiveId,
        created_at: format.createdAt,
        created_by: format.createdBy
      })));
    } catch (error) {
      console.error('Error getting formats by creator ID:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
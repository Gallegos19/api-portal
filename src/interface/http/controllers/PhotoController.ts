import { Request, Response } from 'express';
import { CreatePhotoUseCase } from '../../../application/use-cases/photo/CreatePhotoUseCase';
import { GetAllPhotosUseCase } from '../../../application/use-cases/photo/GetAllPhotosUseCase';
import { GetPhotoByIdUseCase } from '../../../application/use-cases/photo/GetPhotoByIdUseCase';
import { GetPhotosByCreatorIdUseCase } from '../../../application/use-cases/photo/GetPhotosByCreatorIdUseCase';
import { ResourceNotFoundError } from '../../../shared/errors/CustomErrors';

export class PhotoController {
  constructor(
    private readonly createPhotoUseCase: CreatePhotoUseCase,
    private readonly getAllPhotosUseCase: GetAllPhotosUseCase,
    private readonly getPhotoByIdUseCase: GetPhotoByIdUseCase,
    private readonly getPhotosByCreatorIdUseCase: GetPhotosByCreatorIdUseCase
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { title, description, id_archive } = req.body;

      const photo = await this.createPhotoUseCase.execute({
        title,
        description,
        id_archive,
        created_by: req.user?.userId || '' // Use authenticated user
      });

      return res.status(201).json({
        id: photo.id,
        title: photo.title,
        description: photo.description,
        id_archive: photo.archiveId,
        created_at: photo.createdAt,
        created_by: photo.createdBy
      });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      
      console.error('Error creating photo:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const photos = await this.getAllPhotosUseCase.execute();
      
      return res.status(200).json(photos.map(photo => ({
        id: photo.id,
        title: photo.title,
        description: photo.description,
        id_archive: photo.archiveId,
        created_at: photo.createdAt,
        created_by: photo.createdBy
      })));
    } catch (error) {
      console.error('Error getting photos:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const photo = await this.getPhotoByIdUseCase.execute(id);
      
      return res.status(200).json({
        id: photo.id,
        title: photo.title,
        description: photo.description,
        id_archive: photo.archiveId,
        created_at: photo.createdAt,
        created_by: photo.createdBy
      });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      console.error('Error getting photo:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getByCreatorId(req: Request, res: Response): Promise<Response> {
    try {
      const { creatorId } = req.params;
      const photos = await this.getPhotosByCreatorIdUseCase.execute(creatorId);
      
      return res.status(200).json(photos.map(photo => ({
        id: photo.id,
        title: photo.title,
        description: photo.description,
        id_archive: photo.archiveId,
        created_at: photo.createdAt,
        created_by: photo.createdBy
      })));
    } catch (error) {
      console.error('Error getting photos by creator ID:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
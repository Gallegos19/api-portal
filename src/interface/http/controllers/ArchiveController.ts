import { Request, Response } from 'express';
import { CreateArchiveUseCase } from '../../../application/use-cases/archive/CreateArchiveUseCase';
import { GetAllArchivesUseCase } from '../../../application/use-cases/archive/GetAllArchivesUseCase';
import { GetArchiveByIdUseCase } from '../../../application/use-cases/archive/GetArchiveByIdUseCase';
import { GetArchivesByUploaderUserIdUseCase } from '../../../application/use-cases/archive/GetArchivesByUploaderUserIdUseCase';
import { GetArchivesByFileTypeUseCase } from '../../../application/use-cases/archive/GetArchivesByFileTypeUseCase';
import { ResourceNotFoundError } from '../../../shared/errors/CustomErrors';

export class ArchiveController {
  constructor(
    private readonly createArchiveUseCase: CreateArchiveUseCase,
    private readonly getAllArchivesUseCase: GetAllArchivesUseCase,
    private readonly getArchiveByIdUseCase: GetArchiveByIdUseCase,
    private readonly getArchivesByUploaderUserIdUseCase: GetArchivesByUploaderUserIdUseCase,
    private readonly getArchivesByFileTypeUseCase: GetArchivesByFileTypeUseCase
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { file_name, file_type, mime_type, storage_url, uploaded_by } = req.body;

      const archive = await this.createArchiveUseCase.execute({
        file_name,
        file_type,
        mime_type,
        storage_url,
        uploaded_by: uploaded_by || req.user?.userId // Use authenticated user if not specified
      });

      return res.status(201).json({
        id: archive.id,
        file_name: archive.fileName,
        file_type: archive.fileType,
        mime_type: archive.mimeType,
        storage_url: archive.storageUrl,
        uploaded_at: archive.uploadedAt,
        uploaded_by: archive.uploadedBy
      });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      
      console.error('Error creating archive:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const archives = await this.getAllArchivesUseCase.execute();
      
      return res.status(200).json(archives.map(archive => ({
        id: archive.id,
        file_name: archive.fileName,
        file_type: archive.fileType,
        mime_type: archive.mimeType,
        storage_url: archive.storageUrl,
        uploaded_at: archive.uploadedAt,
        uploaded_by: archive.uploadedBy
      })));
    } catch (error) {
      console.error('Error getting archives:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const archive = await this.getArchiveByIdUseCase.execute(id);
      
      return res.status(200).json({
        id: archive.id,
        file_name: archive.fileName,
        file_type: archive.fileType,
        mime_type: archive.mimeType,
        storage_url: archive.storageUrl,
        uploaded_at: archive.uploadedAt,
        uploaded_by: archive.uploadedBy
      });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      console.error('Error getting archive:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getByUploaderUserId(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params;
      const archives = await this.getArchivesByUploaderUserIdUseCase.execute(userId);
      
      return res.status(200).json(archives.map(archive => ({
        id: archive.id,
        file_name: archive.fileName,
        file_type: archive.fileType,
        mime_type: archive.mimeType,
        storage_url: archive.storageUrl,
        uploaded_at: archive.uploadedAt,
        uploaded_by: archive.uploadedBy
      })));
    } catch (error) {
      console.error('Error getting archives by uploader user ID:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getByFileType(req: Request, res: Response): Promise<Response> {
    try {
      const { fileType } = req.params;
      const archives = await this.getArchivesByFileTypeUseCase.execute(fileType);
      
      return res.status(200).json(archives.map(archive => ({
        id: archive.id,
        file_name: archive.fileName,
        file_type: archive.fileType,
        mime_type: archive.mimeType,
        storage_url: archive.storageUrl,
        uploaded_at: archive.uploadedAt,
        uploaded_by: archive.uploadedBy
      })));
    } catch (error) {
      console.error('Error getting archives by file type:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
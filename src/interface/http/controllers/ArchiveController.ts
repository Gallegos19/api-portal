import { Request, Response } from 'express';
import { CreateArchiveUseCase } from '../../../application/use-cases/archive/CreateArchiveUseCase';
import { GetAllArchivesUseCase } from '../../../application/use-cases/archive/GetAllArchivesUseCase';
import { GetArchiveByIdUseCase } from '../../../application/use-cases/archive/GetArchiveByIdUseCase';
import { GetArchivesByUploaderUserIdUseCase } from '../../../application/use-cases/archive/GetArchivesByUploaderUserIdUseCase';
import { GetArchivesByFileTypeUseCase } from '../../../application/use-cases/archive/GetArchivesByFileTypeUseCase';
import { UpdateArchiveUseCase } from '../../../application/use-cases/archive/UpdateArchiveUseCase';
import { DeleteArchiveUseCase } from '../../../application/use-cases/archive/DeleteArchiveUseCase';
import { GetArchiveSignedUrlUseCase } from '../../../application/use-cases/archive/GetArchiveSignedUrlUseCase';
import { ResourceNotFoundError } from '../../../shared/errors/CustomErrors';

export class ArchiveController {
  constructor(
    private readonly createArchiveUseCase: CreateArchiveUseCase,
    private readonly getAllArchivesUseCase: GetAllArchivesUseCase,
    private readonly getArchiveByIdUseCase: GetArchiveByIdUseCase,
    private readonly getArchivesByUploaderUserIdUseCase: GetArchivesByUploaderUserIdUseCase,
    private readonly getArchivesByFileTypeUseCase: GetArchivesByFileTypeUseCase,
    private readonly updateArchiveUseCase: UpdateArchiveUseCase,
    private readonly deleteArchiveUseCase: DeleteArchiveUseCase,
    private readonly getArchiveSignedUrlUseCase: GetArchiveSignedUrlUseCase
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      // Verificar que se haya subido un archivo
      if (!req.file) {
        return res.status(400).json({ message: 'No se proporcionó ningún archivo' });
      }

      // Extraer información del archivo y datos adicionales del body
      const { file_type, folder, uploaded_by } = req.body;
      
      // Validar que uploaded_by esté presente
      if (!uploaded_by) {
        return res.status(400).json({ message: 'El campo uploaded_by es requerido' });
      }
      
      const archive = await this.createArchiveUseCase.execute({
        file_buffer: req.file.buffer,
        file_name: req.file.originalname,
        mime_type: req.file.mimetype,
        file_type: file_type,
        folder: folder,
        uploaded_by: uploaded_by
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

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { file_name, file_type, mime_type, storage_url } = req.body;

      const archive = await this.updateArchiveUseCase.execute(id, {
        file_name,
        file_type,
        mime_type,
        storage_url
      });

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
      console.error('Error updating archive:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getSignedUrl(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const expiresIn = req.query.expiresIn ? parseInt(req.query.expiresIn as string) : 3600; // Default 1 hora
      
      const signedUrl = await this.getArchiveSignedUrlUseCase.execute(id, expiresIn);
      
      return res.status(200).json({
        signed_url: signedUrl,
        expires_in: expiresIn
      });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      console.error('Error getting signed URL:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await this.deleteArchiveUseCase.execute(id);
      return res.status(204).send();
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      console.error('Error deleting archive:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
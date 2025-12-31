import { Request, Response } from 'express';
import { CreateDocumentUseCase } from '../../../application/use-cases/document/CreateDocumentUseCase';
import { GetAllDocumentsUseCase } from '../../../application/use-cases/document/GetAllDocumentsUseCase';
import { GetDocumentByIdUseCase } from '../../../application/use-cases/document/GetDocumentByIdUseCase';
import { GetDocumentsByInternIdUseCase } from '../../../application/use-cases/document/GetDocumentsByInternIdUseCase';
import { UpdateDocumentUseCase } from '../../../application/use-cases/document/UpdateDocumentUseCase';
import { DeleteDocumentUseCase } from '../../../application/use-cases/document/DeleteDocumentUseCase';
import { ResourceNotFoundError } from '../../../shared/errors/CustomErrors';

export class DocumentController {
  constructor(
    private readonly createDocumentUseCase: CreateDocumentUseCase,
    private readonly getAllDocumentsUseCase: GetAllDocumentsUseCase,
    private readonly getDocumentByIdUseCase: GetDocumentByIdUseCase,
    private readonly getDocumentsByInternIdUseCase: GetDocumentsByInternIdUseCase,
    private readonly updateDocumentUseCase: UpdateDocumentUseCase,
    private readonly deleteDocumentUseCase: DeleteDocumentUseCase
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { title, description, id_intern, id_archive } = req.body;

      const document = await this.createDocumentUseCase.execute({
        title,
        description,
        id_intern,
        id_archive
      });

      return res.status(201).json({
        id: document.id,
        title: document.title,
        description: document.description,
        id_intern: document.internId,
        id_archive: document.archiveId,
        created_at: document.createdAt
      });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      
      console.error('Error creating document:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const documents = await this.getAllDocumentsUseCase.execute();
      
      return res.status(200).json(documents.map(document => ({
        id: document.id,
        title: document.title,
        description: document.description,
        id_intern: document.internId,
        id_archive: document.archiveId,
        created_at: document.createdAt
      })));
    } catch (error) {
      console.error('Error getting documents:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const document = await this.getDocumentByIdUseCase.execute(id);
      
      return res.status(200).json({
        id: document.id,
        title: document.title,
        description: document.description,
        id_intern: document.internId,
        id_archive: document.archiveId,
        created_at: document.createdAt
      });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      console.error('Error getting document:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getByInternId(req: Request, res: Response): Promise<Response> {
    try {
      const { internId } = req.params;
      const documents = await this.getDocumentsByInternIdUseCase.execute(internId);
      
      return res.status(200).json(documents.map(document => ({
        id: document.id,
        title: document.title,
        description: document.description,
        id_intern: document.internId,
        id_archive: document.archiveId,
        created_at: document.createdAt
      })));
    } catch (error) {
      console.error('Error getting documents by intern ID:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { title, description } = req.body;

      const document = await this.updateDocumentUseCase.execute(id, {
        title,
        description
      });

      return res.status(200).json({
        id: document.id,
        title: document.title,
        description: document.description,
        id_intern: document.internId,
        id_archive: document.archiveId,
        created_at: document.createdAt
      });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      console.error('Error updating document:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await this.deleteDocumentUseCase.execute(id);
      return res.status(204).send();
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      console.error('Error deleting document:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
import { Request, Response } from 'express';
import { CreateReportUseCase } from '../../../application/use-cases/report/CreateReportUseCase';
import { GetAllReportsUseCase } from '../../../application/use-cases/report/GetAllReportsUseCase';
import { GetReportByIdUseCase } from '../../../application/use-cases/report/GetReportByIdUseCase';
import { GetReportsByCreatorIdUseCase } from '../../../application/use-cases/report/GetReportsByCreatorIdUseCase';
import { GetReportsByTypeUseCase } from '../../../application/use-cases/report/GetReportsByTypeUseCase';
import { ResourceNotFoundError } from '../../../shared/errors/CustomErrors';

export class ReportController {
  constructor(
    private readonly createReportUseCase: CreateReportUseCase,
    private readonly getAllReportsUseCase: GetAllReportsUseCase,
    private readonly getReportByIdUseCase: GetReportByIdUseCase,
    private readonly getReportsByCreatorIdUseCase: GetReportsByCreatorIdUseCase,
    private readonly getReportsByTypeUseCase: GetReportsByTypeUseCase
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { title, description, type, id_archive } = req.body;

      const report = await this.createReportUseCase.execute({
        title,
        description,
        type,
        id_archive,
        created_by: req.user?.userId || '' // Use authenticated user
      });

      return res.status(201).json({
        id: report.id,
        title: report.title,
        description: report.description,
        type: report.type,
        id_archive: report.archiveId,
        created_at: report.createdAt,
        created_by: report.createdBy
      });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      
      console.error('Error creating report:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const reports = await this.getAllReportsUseCase.execute();
      
      return res.status(200).json(reports.map(report => ({
        id: report.id,
        title: report.title,
        description: report.description,
        type: report.type,
        id_archive: report.archiveId,
        created_at: report.createdAt,
        created_by: report.createdBy
      })));
    } catch (error) {
      console.error('Error getting reports:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const report = await this.getReportByIdUseCase.execute(id);
      
      return res.status(200).json({
        id: report.id,
        title: report.title,
        description: report.description,
        type: report.type,
        id_archive: report.archiveId,
        created_at: report.createdAt,
        created_by: report.createdBy
      });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      console.error('Error getting report:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getByCreatorId(req: Request, res: Response): Promise<Response> {
    try {
      const { creatorId } = req.params;
      const reports = await this.getReportsByCreatorIdUseCase.execute(creatorId);
      
      return res.status(200).json(reports.map(report => ({
        id: report.id,
        title: report.title,
        description: report.description,
        type: report.type,
        id_archive: report.archiveId,
        created_at: report.createdAt,
        created_by: report.createdBy
      })));
    } catch (error) {
      console.error('Error getting reports by creator ID:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getByType(req: Request, res: Response): Promise<Response> {
    try {
      const { type } = req.params;
      const reports = await this.getReportsByTypeUseCase.execute(type);
      
      return res.status(200).json(reports.map(report => ({
        id: report.id,
        title: report.title,
        description: report.description,
        type: report.type,
        id_archive: report.archiveId,
        created_at: report.createdAt,
        created_by: report.createdBy
      })));
    } catch (error) {
      console.error('Error getting reports by type:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
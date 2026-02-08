import { Request, Response } from 'express';
import { CreateTrainingUseCase } from '../../../application/use-cases/training/CreateTrainingUseCase';
import { GetAllTrainingsUseCase } from '../../../application/use-cases/training/GetAllTrainingsUseCase';
import { GetTrainingByIdUseCase } from '../../../application/use-cases/training/GetTrainingByIdUseCase';
import { GetTrainingsByCreatorIdUseCase } from '../../../application/use-cases/training/GetTrainingsByCreatorIdUseCase';
import { UpdateTrainingUseCase } from '../../../application/use-cases/training/UpdateTrainingUseCase';
import { DeleteTrainingUseCase } from '../../../application/use-cases/training/DeleteTrainingUseCase';
import { ResourceNotFoundError } from '../../../shared/errors/CustomErrors';

// Helper para convertir string HH:MM a Date con solo tiempo
function parseTimeString(timeStr: string): Date {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
}

// Helper para formatear Date a HH:MM
function formatTime(date: Date): string {
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');
  return `${hours}:${minutes}`;
}

export class TrainingController {
  constructor(
    private readonly createTrainingUseCase: CreateTrainingUseCase,
    private readonly getAllTrainingsUseCase: GetAllTrainingsUseCase,
    private readonly getTrainingByIdUseCase: GetTrainingByIdUseCase,
    private readonly getTrainingsByCreatorIdUseCase: GetTrainingsByCreatorIdUseCase,
    private readonly updateTrainingUseCase: UpdateTrainingUseCase,
    private readonly deleteTrainingUseCase: DeleteTrainingUseCase
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { title, description, url, tiempo, target_audience, status_id, school_year_id } = req.body;

      const training = await this.createTrainingUseCase.execute({
        title,
        description,
        url,
        tiempo: tiempo ? (typeof tiempo === 'string' ? parseTimeString(tiempo) : tiempo) : undefined,
        target_audience,
        created_by: req.user?.userId || '', // Use authenticated user
        status_id,
        school_year_id
      });

      return res.status(201).json({
        id: training.id,
        title: training.title,
        description: training.description,
        url: training.url,
        tiempo: training.tiempo ? formatTime(training.tiempo) : null,
        target_audience: training.targetAudience,
        created_at: training.createdAt,
        created_by: training.createdBy,
        status_id: training.statusId,
        school_year_id: training.schoolYearId
      });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      
      console.error('Error creating training:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const trainings = await this.getAllTrainingsUseCase.execute();
      
      return res.status(200).json(trainings.map(training => ({
        id: training.id,
        title: training.title,
        description: training.description,
        url: training.url,
        tiempo: training.tiempo ? formatTime(training.tiempo) : null,
        target_audience: training.targetAudience,
        created_at: training.createdAt,
        created_by: training.createdBy,
        status_id: training.statusId,
        school_year_id: training.schoolYearId
      })));
    } catch (error) {
      console.error('Error getting trainings:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const training = await this.getTrainingByIdUseCase.execute(id);
      
      return res.status(200).json({
        id: training.id,
        title: training.title,
        description: training.description,
        url: training.url,
        tiempo: training.tiempo ? formatTime(training.tiempo) : null,
        target_audience: training.targetAudience,
        created_at: training.createdAt,
        created_by: training.createdBy,
        status_id: training.statusId,
        school_year_id: training.schoolYearId
      });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      console.error('Error getting training:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getByCreatorId(req: Request, res: Response): Promise<Response> {
    try {
      const { creatorId } = req.params;
      const trainings = await this.getTrainingsByCreatorIdUseCase.execute(creatorId);
      
      return res.status(200).json(trainings.map(training => ({
        id: training.id,
        title: training.title,
        description: training.description,
        url: training.url,
        tiempo: training.tiempo ? formatTime(training.tiempo) : null,
        target_audience: training.targetAudience,
        created_at: training.createdAt,
        created_by: training.createdBy,
        status_id: training.statusId,
        school_year_id: training.schoolYearId
      })));
    } catch (error) {
      console.error('Error getting trainings by creator ID:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { title, description, url, tiempo, target_audience, status_id, school_year_id } = req.body;

      const training = await this.updateTrainingUseCase.execute(id, {
        title,
        description,
        url,
        tiempo: tiempo ? (typeof tiempo === 'string' ? parseTimeString(tiempo) : tiempo) : undefined,
        target_audience,
        status_id,
        school_year_id
      });

      return res.status(200).json({
        id: training.id,
        title: training.title,
        description: training.description,
        url: training.url,
        tiempo: training.tiempo ? formatTime(training.tiempo) : null,
        target_audience: training.targetAudience,
        created_at: training.createdAt,
        created_by: training.createdBy,
        status_id: training.statusId,
        school_year_id: training.schoolYearId
      });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      console.error('Error updating training:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await this.deleteTrainingUseCase.execute(id);
      return res.status(204).send();
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      console.error('Error deleting training:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
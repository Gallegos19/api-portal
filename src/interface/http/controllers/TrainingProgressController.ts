import { Request, Response } from 'express';
import { CreateTrainingProgressUseCase } from '../../../application/use-cases/trainingProgress/CreateTrainingProgressUseCase';
import { GetAllTrainingProgressUseCase } from '../../../application/use-cases/trainingProgress/GetAllTrainingProgressUseCase';
import { GetTrainingProgressByIdUseCase } from '../../../application/use-cases/trainingProgress/GetTrainingProgressByIdUseCase';
import { GetProgressByTrainingIdUseCase } from '../../../application/use-cases/trainingProgress/GetProgressByTrainingIdUseCase';
import { GetProgressByUserIdUseCase } from '../../../application/use-cases/trainingProgress/GetProgressByUserIdUseCase';
import { GetProgressByTrainingAndUserUseCase } from '../../../application/use-cases/trainingProgress/GetProgressByTrainingAndUserUseCase';
import { UpdateTrainingProgressUseCase } from '../../../application/use-cases/trainingProgress/UpdateTrainingProgressUseCase';
import { DeleteTrainingProgressUseCase } from '../../../application/use-cases/trainingProgress/DeleteTrainingProgressUseCase';
import { ResourceNotFoundError } from '../../../shared/errors/CustomErrors';

export class TrainingProgressController {
  constructor(
    private readonly createTrainingProgressUseCase: CreateTrainingProgressUseCase,
    private readonly getAllTrainingProgressUseCase: GetAllTrainingProgressUseCase,
    private readonly getTrainingProgressByIdUseCase: GetTrainingProgressByIdUseCase,
    private readonly getProgressByTrainingIdUseCase: GetProgressByTrainingIdUseCase,
    private readonly getProgressByUserIdUseCase: GetProgressByUserIdUseCase,
    private readonly getProgressByTrainingAndUserUseCase: GetProgressByTrainingAndUserUseCase,
    private readonly updateTrainingProgressUseCase: UpdateTrainingProgressUseCase,
    private readonly deleteTrainingProgressUseCase: DeleteTrainingProgressUseCase
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { id_training, id_user, progress_percentage } = req.body;

      const trainingProgress = await this.createTrainingProgressUseCase.execute({
        id_training,
        id_user,
        progress_percentage
      });

      return res.status(201).json({
        id: trainingProgress.id,
        id_training: trainingProgress.trainingId,
        id_user: trainingProgress.userId,
        completed: trainingProgress.completed,
        progress_percentage: trainingProgress.progressPercentage,
        completed_at: trainingProgress.completedAt,
        started_at: trainingProgress.startedAt,
        last_viewed_at: trainingProgress.lastViewedAt
      });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      
      if (error instanceof Error && error.message.includes('already exists')) {
        return res.status(409).json({ message: error.message });
      }
      
      console.error('Error creating training progress:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const progressList = await this.getAllTrainingProgressUseCase.execute();
      
      return res.status(200).json(progressList.map(progress => ({
        id: progress.id,
        id_training: progress.trainingId,
        id_user: progress.userId,
        completed: progress.completed,
        progress_percentage: progress.progressPercentage,
        completed_at: progress.completedAt,
        started_at: progress.startedAt,
        last_viewed_at: progress.lastViewedAt
      })));
    } catch (error) {
      console.error('Error getting training progress:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const progress = await this.getTrainingProgressByIdUseCase.execute(id);
      
      return res.status(200).json({
        id: progress.id,
        id_training: progress.trainingId,
        id_user: progress.userId,
        completed: progress.completed,
        progress_percentage: progress.progressPercentage,
        completed_at: progress.completedAt,
        started_at: progress.startedAt,
        last_viewed_at: progress.lastViewedAt
      });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      console.error('Error getting training progress:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getByTrainingId(req: Request, res: Response): Promise<Response> {
    try {
      const { trainingId } = req.params;
      const progressList = await this.getProgressByTrainingIdUseCase.execute(trainingId);
      
      return res.status(200).json(progressList.map(progress => ({
        id: progress.id,
        id_training: progress.trainingId,
        id_user: progress.userId,
        completed: progress.completed,
        progress_percentage: progress.progressPercentage,
        completed_at: progress.completedAt,
        started_at: progress.startedAt,
        last_viewed_at: progress.lastViewedAt
      })));
    } catch (error) {
      console.error('Error getting training progress by training:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getByUserId(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params;
      const progressList = await this.getProgressByUserIdUseCase.execute(userId);
      
      return res.status(200).json(progressList.map(progress => ({
        id: progress.id,
        id_training: progress.trainingId,
        id_user: progress.userId,
        completed: progress.completed,
        progress_percentage: progress.progressPercentage,
        completed_at: progress.completedAt,
        started_at: progress.startedAt,
        last_viewed_at: progress.lastViewedAt
      })));
    } catch (error) {
      console.error('Error getting training progress by user:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getByTrainingAndUser(req: Request, res: Response): Promise<Response> {
    try {
      const { trainingId, userId } = req.params;
      const progress = await this.getProgressByTrainingAndUserUseCase.execute(trainingId, userId);
      
      if (!progress) {
        return res.status(404).json({ message: 'Training progress not found' });
      }
      
      return res.status(200).json({
        id: progress.id,
        id_training: progress.trainingId,
        id_user: progress.userId,
        completed: progress.completed,
        progress_percentage: progress.progressPercentage,
        completed_at: progress.completedAt,
        started_at: progress.startedAt,
        last_viewed_at: progress.lastViewedAt
      });
    } catch (error) {
      console.error('Error getting training progress:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const { progress_percentage, completed } = req.body;

      const updatedProgress = await this.updateTrainingProgressUseCase.execute(id, {
        progress_percentage,
        completed
      });

      return res.status(200).json({
        id: updatedProgress.id,
        id_training: updatedProgress.trainingId,
        id_user: updatedProgress.userId,
        completed: updatedProgress.completed,
        progress_percentage: updatedProgress.progressPercentage,
        completed_at: updatedProgress.completedAt,
        started_at: updatedProgress.startedAt,
        last_viewed_at: updatedProgress.lastViewedAt
      });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      if (error instanceof Error && error.message.includes('between 0 and 100')) {
        return res.status(400).json({ message: error.message });
      }
      console.error('Error updating training progress:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await this.deleteTrainingProgressUseCase.execute(id);
      
      return res.status(204).send();
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      console.error('Error deleting training progress:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}

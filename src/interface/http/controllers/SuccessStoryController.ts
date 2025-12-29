import { Request, Response } from 'express';
import { CreateSuccessStoryUseCase } from '../../../application/use-cases/successStory/CreateSuccessStoryUseCase';
import { GetAllSuccessStoriesUseCase } from '../../../application/use-cases/successStory/GetAllSuccessStoriesUseCase';
import { GetSuccessStoryByIdUseCase } from '../../../application/use-cases/successStory/GetSuccessStoryByIdUseCase';
import { GetSuccessStoriesByCreatorIdUseCase } from '../../../application/use-cases/successStory/GetSuccessStoriesByCreatorIdUseCase';
import { ResourceNotFoundError } from '../../../shared/errors/CustomErrors';

export class SuccessStoryController {
  constructor(
    private readonly createSuccessStoryUseCase: CreateSuccessStoryUseCase,
    private readonly getAllSuccessStoriesUseCase: GetAllSuccessStoriesUseCase,
    private readonly getSuccessStoryByIdUseCase: GetSuccessStoryByIdUseCase,
    private readonly getSuccessStoriesByCreatorIdUseCase: GetSuccessStoriesByCreatorIdUseCase
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { title, description, id_photo } = req.body;

      const successStory = await this.createSuccessStoryUseCase.execute({
        title,
        description,
        id_photo,
        created_by: req.user?.userId || '' // Use authenticated user
      });

      return res.status(201).json({
        id: successStory.id,
        title: successStory.title,
        description: successStory.description,
        id_photo: successStory.photoId,
        created_at: successStory.createdAt,
        created_by: successStory.createdBy
      });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      
      console.error('Error creating success story:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const successStories = await this.getAllSuccessStoriesUseCase.execute();
      
      return res.status(200).json(successStories.map(story => ({
        id: story.id,
        title: story.title,
        description: story.description,
        id_photo: story.photoId,
        created_at: story.createdAt,
        created_by: story.createdBy
      })));
    } catch (error) {
      console.error('Error getting success stories:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const story = await this.getSuccessStoryByIdUseCase.execute(id);
      
      return res.status(200).json({
        id: story.id,
        title: story.title,
        description: story.description,
        id_photo: story.photoId,
        created_at: story.createdAt,
        created_by: story.createdBy
      });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      console.error('Error getting success story:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getByCreatorId(req: Request, res: Response): Promise<Response> {
    try {
      const { creatorId } = req.params;
      const successStories = await this.getSuccessStoriesByCreatorIdUseCase.execute(creatorId);
      
      return res.status(200).json(successStories.map(story => ({
        id: story.id,
        title: story.title,
        description: story.description,
        id_photo: story.photoId,
        created_at: story.createdAt,
        created_by: story.createdBy
      })));
    } catch (error) {
      console.error('Error getting success stories by creator ID:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
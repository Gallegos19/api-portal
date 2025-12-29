import { Request, Response } from 'express';
import { CreateEventUseCase } from '../../../application/use-cases/event/CreateEventUseCase';
import { GetAllEventsUseCase } from '../../../application/use-cases/event/GetAllEventsUseCase';
import { GetEventByIdUseCase } from '../../../application/use-cases/event/GetEventByIdUseCase';
import { GetEventsByCreatorIdUseCase } from '../../../application/use-cases/event/GetEventsByCreatorIdUseCase';
import { ResourceNotFoundError } from '../../../shared/errors/CustomErrors';

export class EventController {
  constructor(
    private readonly createEventUseCase: CreateEventUseCase,
    private readonly getAllEventsUseCase: GetAllEventsUseCase,
    private readonly getEventByIdUseCase: GetEventByIdUseCase,
    private readonly getEventsByCreatorIdUseCase: GetEventsByCreatorIdUseCase
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { title, description } = req.body;

      const event = await this.createEventUseCase.execute({
        title,
        description,
        created_by: req.user?.userId || '' // Use authenticated user
      });

      return res.status(201).json({
        id: event.id,
        title: event.title,
        description: event.description,
        created_at: event.createdAt,
        created_by: event.createdBy
      });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      
      console.error('Error creating event:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const events = await this.getAllEventsUseCase.execute();
      
      return res.status(200).json(events.map(event => ({
        id: event.id,
        title: event.title,
        description: event.description,
        created_at: event.createdAt,
        created_by: event.createdBy
      })));
    } catch (error) {
      console.error('Error getting events:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const event = await this.getEventByIdUseCase.execute(id);
      
      return res.status(200).json({
        id: event.id,
        title: event.title,
        description: event.description,
        created_at: event.createdAt,
        created_by: event.createdBy
      });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      console.error('Error getting event:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getByCreatorId(req: Request, res: Response): Promise<Response> {
    try {
      const { creatorId } = req.params;
      const events = await this.getEventsByCreatorIdUseCase.execute(creatorId);
      
      return res.status(200).json(events.map(event => ({
        id: event.id,
        title: event.title,
        description: event.description,
        created_at: event.createdAt,
        created_by: event.createdBy
      })));
    } catch (error) {
      console.error('Error getting events by creator ID:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
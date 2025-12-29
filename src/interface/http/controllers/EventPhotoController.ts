import { Request, Response } from 'express';
import { CreateEventPhotoUseCase } from '../../../application/use-cases/eventPhoto/CreateEventPhotoUseCase';
import { GetEventPhotosByEventIdUseCase } from '../../../application/use-cases/eventPhoto/GetEventPhotosByEventIdUseCase';
import { GetEventPhotosByPhotoIdUseCase } from '../../../application/use-cases/eventPhoto/GetEventPhotosByPhotoIdUseCase';
import { DeleteEventPhotoUseCase } from '../../../application/use-cases/eventPhoto/DeleteEventPhotoUseCase';
import { ResourceNotFoundError } from '../../../shared/errors/CustomErrors';

export class EventPhotoController {
  constructor(
    private readonly createEventPhotoUseCase: CreateEventPhotoUseCase,
    private readonly getEventPhotosByEventIdUseCase: GetEventPhotosByEventIdUseCase,
    private readonly getEventPhotosByPhotoIdUseCase: GetEventPhotosByPhotoIdUseCase,
    private readonly deleteEventPhotoUseCase: DeleteEventPhotoUseCase
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const { id_event, id_photo } = req.body;

      const eventPhoto = await this.createEventPhotoUseCase.execute({
        id_event,
        id_photo
      });

      return res.status(201).json({
        id: eventPhoto.id,
        id_event: eventPhoto.eventId,
        id_photo: eventPhoto.photoId
      });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      
      console.error('Error creating event photo:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getByEventId(req: Request, res: Response): Promise<Response> {
    try {
      const { eventId } = req.params;
      const eventPhotos = await this.getEventPhotosByEventIdUseCase.execute(eventId);
      
      return res.status(200).json(eventPhotos.map(eventPhoto => ({
        id: eventPhoto.id,
        id_event: eventPhoto.eventId,
        id_photo: eventPhoto.photoId
      })));
    } catch (error) {
      console.error('Error getting event photos by event ID:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getByPhotoId(req: Request, res: Response): Promise<Response> {
    try {
      const { photoId } = req.params;
      const eventPhotos = await this.getEventPhotosByPhotoIdUseCase.execute(photoId);
      
      return res.status(200).json(eventPhotos.map(eventPhoto => ({
        id: eventPhoto.id,
        id_event: eventPhoto.eventId,
        id_photo: eventPhoto.photoId
      })));
    } catch (error) {
      console.error('Error getting event photos by photo ID:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async delete(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      await this.deleteEventPhotoUseCase.execute(id);
      return res.status(204).send();
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      console.error('Error deleting event photo:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
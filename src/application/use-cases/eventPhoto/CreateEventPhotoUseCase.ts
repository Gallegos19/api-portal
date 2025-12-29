import { EventPhoto } from "../../../domain/entities/EventPhoto";
import { EventPhotoRepository } from "../../../domain/repositories/EventPhotoRepository";
import { EventRepository } from "../../../domain/repositories/EventRepository";
import { PhotoRepository } from "../../../domain/repositories/PhotoRepository";
import { CreateEventPhotoDTO } from "../../dto/eventPhoto/CreateEventPhotoDTO";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

export class CreateEventPhotoUseCase {
  constructor(
    private eventPhotoRepository: EventPhotoRepository,
    private eventRepository: EventRepository,
    private photoRepository: PhotoRepository
  ) {}

  async execute(data: CreateEventPhotoDTO): Promise<EventPhoto> {
    // Verify if event exists
    const event = await this.eventRepository.findById(data.id_event);
    
    if (!event) {
      throw new ResourceNotFoundError('Event', data.id_event);
    }
    
    // Verify if photo exists
    const photo = await this.photoRepository.findById(data.id_photo);
    
    if (!photo) {
      throw new ResourceNotFoundError('Photo', data.id_photo);
    }
    
    // Create event photo entity
    const eventPhoto = EventPhoto.create({
      id_event: data.id_event,
      id_photo: data.id_photo
    });
    
    // Save the event photo
    return this.eventPhotoRepository.save(eventPhoto);
  }
}
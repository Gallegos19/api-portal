import { EventPhoto } from "../../../domain/entities/EventPhoto";
import { EventPhotoRepository } from "../../../domain/repositories/EventPhotoRepository";

export class GetEventPhotosByEventIdUseCase {
  constructor(
    private eventPhotoRepository: EventPhotoRepository
  ) {}

  async execute(eventId: string): Promise<EventPhoto[]> {
    const eventPhotos = await this.eventPhotoRepository.findByEventId(eventId);
    return eventPhotos;
  }
}

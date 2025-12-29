import { EventPhoto } from "../../../domain/entities/EventPhoto";
import { EventPhotoRepository } from "../../../domain/repositories/EventPhotoRepository";

export class GetEventPhotosByPhotoIdUseCase {
  constructor(
    private eventPhotoRepository: EventPhotoRepository
  ) {}

  async execute(photoId: string): Promise<EventPhoto[]> {
    const eventPhotos = await this.eventPhotoRepository.findByPhotoId(photoId);
    return eventPhotos;
  }
}

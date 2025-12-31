import { EventPhotoRepository } from "../../../domain/repositories/EventPhotoRepository";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

export class DeleteEventPhotoUseCase {
  constructor(private eventPhotoRepository: EventPhotoRepository) {}

  async execute(id: string): Promise<void> {
    const eventPhoto = await this.eventPhotoRepository.findById(id);
    
    if (!eventPhoto) {
      throw new ResourceNotFoundError("EventPhoto", id);
    }

    await this.eventPhotoRepository.softDelete(id);
  }
}

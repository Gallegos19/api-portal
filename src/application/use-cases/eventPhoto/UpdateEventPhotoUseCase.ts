import { EventPhoto } from "../../../domain/entities/EventPhoto";
import { EventPhotoRepository } from "../../../domain/repositories/EventPhotoRepository";
import { UpdateEventPhotoDTO } from "../../dto/eventPhoto/UpdateEventPhotoDTO";

export class UpdateEventPhotoUseCase {
  constructor(
    private eventPhotoRepository: EventPhotoRepository
  ) {}

  async execute(id: string, data: UpdateEventPhotoDTO): Promise<EventPhoto> {
    const eventPhoto = await this.eventPhotoRepository.findById(id);
    
    if (!eventPhoto) {
      throw new Error("EventPhoto not found");
    }

    // Update eventPhoto properties
    if (data.id_event) eventPhoto.updateEventId(data.id_event);
    if (data.id_photo) eventPhoto.updatePhotoId(data.id_photo);

    return this.eventPhotoRepository.update(eventPhoto);
  }
}

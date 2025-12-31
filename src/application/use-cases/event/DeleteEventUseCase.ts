import { EventRepository } from "../../../domain/repositories/EventRepository";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

export class DeleteEventUseCase {
  constructor(private eventRepository: EventRepository) {}

  async execute(id: string): Promise<void> {
    const event = await this.eventRepository.findById(id);
    
    if (!event) {
      throw new ResourceNotFoundError("Event", id);
    }

    await this.eventRepository.softDelete(id);
  }
}

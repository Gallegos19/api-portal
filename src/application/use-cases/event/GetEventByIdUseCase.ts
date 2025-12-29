import { Event } from "../../../domain/entities/Event";
import { EventRepository } from "../../../domain/repositories/EventRepository";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

export class GetEventByIdUseCase {
  constructor(
    private eventRepository: EventRepository
  ) {}

  async execute(id: string): Promise<Event> {
    const event = await this.eventRepository.findById(id);
    
    if (!event) {
      throw new ResourceNotFoundError('Event', id);
    }
    
    return event;
  }
}

import { Event } from "../../../domain/entities/Event";
import { EventRepository } from "../../../domain/repositories/EventRepository";
import { UpdateEventDTO } from "../../dto/event/UpdateEventDTO";

export class UpdateEventUseCase {
  constructor(
    private eventRepository: EventRepository
  ) {}

  async execute(id: string, data: UpdateEventDTO): Promise<Event> {
    const event = await this.eventRepository.findById(id);
    
    if (!event) {
      throw new Error("Event not found");
    }

    // Update event properties
    if (data.title) event.updateTitle(data.title);
    if (data.description !== undefined) event.updateDescription(data.description);

    return this.eventRepository.update(event);
  }
}

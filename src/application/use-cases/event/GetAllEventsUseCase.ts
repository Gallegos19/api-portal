import { Event } from "../../../domain/entities/Event";
import { EventRepository } from "../../../domain/repositories/EventRepository";

export class GetAllEventsUseCase {
  constructor(
    private eventRepository: EventRepository
  ) {}

  async execute(): Promise<Event[]> {
    const events = await this.eventRepository.findAll();
    return events;
  }
}

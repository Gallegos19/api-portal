import { Event } from "../../../domain/entities/Event";
import { EventRepository } from "../../../domain/repositories/EventRepository";

export class GetEventsByCreatorIdUseCase {
  constructor(
    private eventRepository: EventRepository
  ) {}

  async execute(creatorId: string): Promise<Event[]> {
    const events = await this.eventRepository.findByCreatorId(creatorId);
    return events;
  }
}

import { Event } from "../../../domain/entities/Event";
import { EventRepository } from "../../../domain/repositories/EventRepository";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { CreateEventDTO } from "../../dto/event/CreateEventDTO";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

export class CreateEventUseCase {
  constructor(
    private eventRepository: EventRepository,
    private userRepository: UserRepository
  ) {}

  private normalizeOptionalId(value?: string): string | undefined {
    if (typeof value !== 'string') return undefined;
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }

  async execute(data: CreateEventDTO): Promise<Event> {
    // Verify if creator user exists
    const user = await this.userRepository.findById(data.created_by);
    
    if (!user) {
      throw new ResourceNotFoundError('User', data.created_by);
    }
    
    // Create event entity
    const event = Event.create({
      title: data.title,
      description: data.description,
      created_by: data.created_by,
      status_id: this.normalizeOptionalId(data.status_id),
      school_year_id: this.normalizeOptionalId(data.school_year_id)
    });
    
    // Save the event
    return this.eventRepository.save(event);
  }
}
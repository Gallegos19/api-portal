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
      created_by: data.created_by
    });
    
    // Save the event
    return this.eventRepository.save(event);
  }
}
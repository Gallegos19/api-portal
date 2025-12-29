import { Event } from "../entities/Event";

export interface EventRepository {
  findById(id: string): Promise<Event | null>;
  findByCreatorId(creatorId: string): Promise<Event[]>;
  findAll(): Promise<Event[]>;
  save(event: Event): Promise<Event>;
  update(event: Event): Promise<Event>;
  delete(id: string): Promise<void>;
}
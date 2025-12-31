import { Event } from "../entities/Event";

export interface EventRepository {
  findById(id: string): Promise<Event | null>;
  findByCreatorId(creatorId: string): Promise<Event[]>;
  findAll(): Promise<Event[]>;
  save(event: Event): Promise<Event>;
  update(event: Event): Promise<Event>;
  softDelete(id: string): Promise<void>;
  delete(id: string): Promise<void>;
}
import { EventPhoto } from "../entities/EventPhoto";

export interface EventPhotoRepository {
  findById(id: string): Promise<EventPhoto | null>;
  findByEventId(eventId: string): Promise<EventPhoto[]>;
  findByPhotoId(photoId: string): Promise<EventPhoto[]>;
  findAll(): Promise<EventPhoto[]>;
  save(eventPhoto: EventPhoto): Promise<EventPhoto>;
  delete(id: string): Promise<void>;
}
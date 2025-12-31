import { EventPhoto } from "../entities/EventPhoto";

export interface EventPhotoRepository {
  findById(id: string): Promise<EventPhoto | null>;
  findByEventId(eventId: string): Promise<EventPhoto[]>;
  findByPhotoId(photoId: string): Promise<EventPhoto[]>;
  findAll(): Promise<EventPhoto[]>;
  save(eventPhoto: EventPhoto): Promise<EventPhoto>;
  update(eventPhoto: EventPhoto): Promise<EventPhoto>;
  softDelete(id: string): Promise<void>;
  delete(id: string): Promise<void>;
}
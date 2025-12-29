import { Photo } from "../entities/Photo";

export interface PhotoRepository {
  findById(id: string): Promise<Photo | null>;
  findByCreatorId(creatorId: string): Promise<Photo[]>;
  findAll(): Promise<Photo[]>;
  save(photo: Photo): Promise<Photo>;
  update(photo: Photo): Promise<Photo>;
  delete(id: string): Promise<void>;
}
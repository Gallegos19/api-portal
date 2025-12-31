import { Training } from "../entities/Training";

export interface TrainingRepository {
  findById(id: string): Promise<Training | null>;
  findByCreatorId(creatorId: string): Promise<Training[]>;
  findAll(): Promise<Training[]>;
  save(training: Training): Promise<Training>;
  update(training: Training): Promise<Training>;
  softDelete(id: string): Promise<void>;
  delete(id: string): Promise<void>;
}
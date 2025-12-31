import { Coordinator } from "../entities/Coordinator";

export interface CoordinatorRepository {
  findById(id: string): Promise<Coordinator | null>;
  findByUserId(userId: string): Promise<Coordinator | null>;
  findAll(): Promise<Coordinator[]>;
  save(coordinator: Coordinator): Promise<Coordinator>;
  update(coordinator: Coordinator): Promise<Coordinator>;
  softDelete(id: string): Promise<void>;
  delete(id: string): Promise<void>;
}
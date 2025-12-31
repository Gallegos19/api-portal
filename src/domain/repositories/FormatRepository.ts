import { Format } from "../entities/Format";

export interface FormatRepository {
  findById(id: string): Promise<Format | null>;
  findByCreatorId(creatorId: string): Promise<Format[]>;
  findAll(): Promise<Format[]>;
  save(format: Format): Promise<Format>;
  update(format: Format): Promise<Format>;
  softDelete(id: string): Promise<void>;
  delete(id: string): Promise<void>;
}
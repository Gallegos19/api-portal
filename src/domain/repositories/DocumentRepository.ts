import { Document } from "../entities/Document";

export interface DocumentRepository {
  findById(id: string): Promise<Document | null>;
  findAll(): Promise<Document[]>;
  findByInternId(internId: string): Promise<Document[]>;
  save(document: Document): Promise<Document>;
  update(document: Document): Promise<Document>;
  delete(id: string): Promise<void>;
}
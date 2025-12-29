import { Archive } from "../entities/Archive";

export interface ArchiveRepository {
  findById(id: string): Promise<Archive | null>;
  findByUploaderUserId(uploaderUserId: string): Promise<Archive[]>;
  findByFileType(fileType: string): Promise<Archive[]>;
  findAll(): Promise<Archive[]>;
  save(archive: Archive): Promise<Archive>;
  update(archive: Archive): Promise<Archive>;
  delete(id: string): Promise<void>;
}
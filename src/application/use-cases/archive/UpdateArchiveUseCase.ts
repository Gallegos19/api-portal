import { Archive } from "../../../domain/entities/Archive";
import { ArchiveRepository } from "../../../domain/repositories/ArchiveRepository";
import { UpdateArchiveDTO } from "../../dto/archive/UpdateArchiveDTO";

export class UpdateArchiveUseCase {
  constructor(
    private archiveRepository: ArchiveRepository
  ) {}

  async execute(id: string, data: UpdateArchiveDTO): Promise<Archive> {
    const archive = await this.archiveRepository.findById(id);
    
    if (!archive) {
      throw new Error("Archive not found");
    }

    // Update archive properties
    if (data.file_name) archive.updateFileName(data.file_name);
    if (data.file_type !== undefined) archive.updateFileType(data.file_type);
    if (data.mime_type !== undefined) archive.updateMimeType(data.mime_type);
    if (data.storage_url) archive.updateStorageUrl(data.storage_url);

    return this.archiveRepository.update(archive);
  }
}

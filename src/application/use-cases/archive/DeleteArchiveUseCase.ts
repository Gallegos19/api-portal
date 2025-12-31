import { ArchiveRepository } from "../../../domain/repositories/ArchiveRepository";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

export class DeleteArchiveUseCase {
  constructor(private archiveRepository: ArchiveRepository) {}

  async execute(id: string): Promise<void> {
    const archive = await this.archiveRepository.findById(id);
    
    if (!archive) {
      throw new ResourceNotFoundError("Archive", id);
    }

    await this.archiveRepository.softDelete(id);
  }
}

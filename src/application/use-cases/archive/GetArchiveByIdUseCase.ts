import { Archive } from "../../../domain/entities/Archive";
import { ArchiveRepository } from "../../../domain/repositories/ArchiveRepository";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

export class GetArchiveByIdUseCase {
  constructor(
    private archiveRepository: ArchiveRepository
  ) {}

  async execute(id: string): Promise<Archive> {
    const archive = await this.archiveRepository.findById(id);
    
    if (!archive) {
      throw new ResourceNotFoundError("Archive", id);
    }
    
    return archive;
  }
}

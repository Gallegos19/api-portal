import { Archive } from "../../../domain/entities/Archive";
import { ArchiveRepository } from "../../../domain/repositories/ArchiveRepository";

export class GetArchivesByFileTypeUseCase {
  constructor(
    private archiveRepository: ArchiveRepository
  ) {}

  async execute(fileType: string): Promise<Archive[]> {
    const archives = await this.archiveRepository.findByFileType(fileType);
    return archives;
  }
}

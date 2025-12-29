import { Archive } from "../../../domain/entities/Archive";
import { ArchiveRepository } from "../../../domain/repositories/ArchiveRepository";

export class GetAllArchivesUseCase {
  constructor(
    private archiveRepository: ArchiveRepository
  ) {}

  async execute(): Promise<Archive[]> {
    const archives = await this.archiveRepository.findAll();
    return archives;
  }
}

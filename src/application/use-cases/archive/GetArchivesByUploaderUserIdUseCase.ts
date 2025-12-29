import { Archive } from "../../../domain/entities/Archive";
import { ArchiveRepository } from "../../../domain/repositories/ArchiveRepository";

export class GetArchivesByUploaderUserIdUseCase {
  constructor(
    private archiveRepository: ArchiveRepository
  ) {}

  async execute(uploaderUserId: string): Promise<Archive[]> {
    const archives = await this.archiveRepository.findByUploaderUserId(uploaderUserId);
    return archives;
  }
}

import { Archive } from "../../../domain/entities/Archive";
import { ArchiveRepository } from "../../../domain/repositories/ArchiveRepository";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { CreateArchiveDTO } from "../../dto/archive/CreateArchiveDTO";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

export class CreateArchiveUseCase {
  constructor(
    private archiveRepository: ArchiveRepository,
    private userRepository: UserRepository
  ) {}

  async execute(data: CreateArchiveDTO): Promise<Archive> {
    // Verify if uploader user exists
    const user = await this.userRepository.findById(data.uploaded_by);
    
    if (!user) {
      throw new ResourceNotFoundError('User', data.uploaded_by);
    }
    
    // Create archive entity
    const archive = Archive.create({
      file_name: data.file_name,
      file_type: data.file_type,
      mime_type: data.mime_type,
      storage_url: data.storage_url,
      uploaded_by: data.uploaded_by
    });
    
    // Save the archive
    return this.archiveRepository.save(archive);
  }
}
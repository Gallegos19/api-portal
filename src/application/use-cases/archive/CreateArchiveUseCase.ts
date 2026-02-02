import { Archive } from "../../../domain/entities/Archive";
import { ArchiveRepository } from "../../../domain/repositories/ArchiveRepository";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { CreateArchiveDTO } from "../../dto/archive/CreateArchiveDTO";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";
import { StorageService } from "../../interfaces/StorageService";

export class CreateArchiveUseCase {
  constructor(
    private archiveRepository: ArchiveRepository,
    private userRepository: UserRepository,
    private storageService: StorageService
  ) {}

  async execute(data: CreateArchiveDTO): Promise<Archive> {
    // Verify if uploader user exists
    const user = await this.userRepository.findById(data.uploaded_by);
    
    if (!user) {
      throw new ResourceNotFoundError('User', data.uploaded_by);
    }
    
    // Upload file to R2 storage
    const folder = data.folder || 'archives';
    const uniqueFileName = `${Date.now()}-${data.file_name}`;
    
    const storageUrl = await this.storageService.uploadFile(
      data.file_buffer,
      uniqueFileName,
      folder,
      data.mime_type
    );
    
    // Create archive entity
    const archive = Archive.create({
      file_name: data.file_name,
      file_type: data.file_type,
      mime_type: data.mime_type,
      storage_url: storageUrl,
      uploaded_by: data.uploaded_by
    });
    
    // Save the archive
    return this.archiveRepository.save(archive);
  }
}
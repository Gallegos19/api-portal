import { Photo } from "../../../domain/entities/Photo";
import { PhotoRepository } from "../../../domain/repositories/PhotoRepository";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { ArchiveRepository } from "../../../domain/repositories/ArchiveRepository";
import { CreatePhotoDTO } from "../../dto/photo/CreatePhotoDTO";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

export class CreatePhotoUseCase {
  constructor(
    private photoRepository: PhotoRepository,
    private userRepository: UserRepository,
    private archiveRepository: ArchiveRepository
  ) {}

  async execute(data: CreatePhotoDTO): Promise<Photo> {
    // Verify if creator user exists
    const user = await this.userRepository.findById(data.created_by);
    
    if (!user) {
      throw new ResourceNotFoundError('User', data.created_by);
    }
    
    // Verify if archive exists when provided
    if (data.id_archive) {
      const archive = await this.archiveRepository.findById(data.id_archive);
      
      if (!archive) {
        throw new ResourceNotFoundError('Archive', data.id_archive);
      }
    }
    
    // Create photo entity
    const photo = Photo.create({
      title: data.title,
      description: data.description,
      id_archive: data.id_archive,
      created_by: data.created_by
    });
    
    // Save the photo
    return this.photoRepository.save(photo);
  }
}
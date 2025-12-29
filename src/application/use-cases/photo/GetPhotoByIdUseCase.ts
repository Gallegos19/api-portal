import { Photo } from "../../../domain/entities/Photo";
import { PhotoRepository } from "../../../domain/repositories/PhotoRepository";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

export class GetPhotoByIdUseCase {
  constructor(
    private photoRepository: PhotoRepository
  ) {}

  async execute(id: string): Promise<Photo> {
    const photo = await this.photoRepository.findById(id);
    
    if (!photo) {
      throw new ResourceNotFoundError('Photo', id);
    }
    
    return photo;
  }
}

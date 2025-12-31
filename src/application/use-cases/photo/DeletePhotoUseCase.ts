import { PhotoRepository } from "../../../domain/repositories/PhotoRepository";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

export class DeletePhotoUseCase {
  constructor(private photoRepository: PhotoRepository) {}

  async execute(id: string): Promise<void> {
    const photo = await this.photoRepository.findById(id);
    
    if (!photo) {
      throw new ResourceNotFoundError("Photo", id);
    }

    await this.photoRepository.softDelete(id);
  }
}

import { Photo } from "../../../domain/entities/Photo";
import { PhotoRepository } from "../../../domain/repositories/PhotoRepository";

export class GetPhotosByCreatorIdUseCase {
  constructor(
    private photoRepository: PhotoRepository
  ) {}

  async execute(creatorId: string): Promise<Photo[]> {
    const photos = await this.photoRepository.findByCreatorId(creatorId);
    return photos;
  }
}

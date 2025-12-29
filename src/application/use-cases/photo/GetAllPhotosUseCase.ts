import { Photo } from "../../../domain/entities/Photo";
import { PhotoRepository } from "../../../domain/repositories/PhotoRepository";

export class GetAllPhotosUseCase {
  constructor(
    private photoRepository: PhotoRepository
  ) {}

  async execute(): Promise<Photo[]> {
    const photos = await this.photoRepository.findAll();
    return photos;
  }
}

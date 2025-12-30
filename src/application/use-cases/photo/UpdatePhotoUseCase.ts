import { Photo } from "../../../domain/entities/Photo";
import { PhotoRepository } from "../../../domain/repositories/PhotoRepository";
import { UpdatePhotoDTO } from "../../dto/photo/UpdatePhotoDTO";

export class UpdatePhotoUseCase {
  constructor(
    private photoRepository: PhotoRepository
  ) {}

  async execute(id: string, data: UpdatePhotoDTO): Promise<Photo> {
    const photo = await this.photoRepository.findById(id);
    
    if (!photo) {
      throw new Error("Photo not found");
    }

    // Update photo properties
    if (data.title) photo.updateTitle(data.title);
    if (data.description !== undefined) photo.updateDescription(data.description);
    if (data.id_archive !== undefined) photo.updateArchiveId(data.id_archive);

    return this.photoRepository.update(photo);
  }
}

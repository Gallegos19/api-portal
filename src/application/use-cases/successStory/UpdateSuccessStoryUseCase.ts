import { SuccessStory } from "../../../domain/entities/SuccessStory";
import { SuccessStoryRepository } from "../../../domain/repositories/SuccessStoryRepository";
import { UpdateSuccessStoryDTO } from "../../dto/successStory/UpdateSuccessStoryDTO";

export class UpdateSuccessStoryUseCase {
  constructor(
    private successStoryRepository: SuccessStoryRepository
  ) {}

  async execute(id: string, data: UpdateSuccessStoryDTO): Promise<SuccessStory> {
    const successStory = await this.successStoryRepository.findById(id);
    
    if (!successStory) {
      throw new Error("Success Story not found");
    }

    // Update success story properties
    if (data.title) successStory.updateTitle(data.title);
    if (data.description !== undefined) successStory.updateDescription(data.description);
    if (data.id_photo !== undefined) successStory.updatePhotoId(data.id_photo);

    return this.successStoryRepository.update(successStory);
  }
}

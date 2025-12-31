import { SuccessStoryRepository } from "../../../domain/repositories/SuccessStoryRepository";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

export class DeleteSuccessStoryUseCase {
  constructor(private successStoryRepository: SuccessStoryRepository) {}

  async execute(id: string): Promise<void> {
    const successStory = await this.successStoryRepository.findById(id);
    
    if (!successStory) {
      throw new ResourceNotFoundError("SuccessStory", id);
    }

    await this.successStoryRepository.softDelete(id);
  }
}

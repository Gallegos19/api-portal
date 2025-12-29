import { SuccessStory } from "../../../domain/entities/SuccessStory";
import { SuccessStoryRepository } from "../../../domain/repositories/SuccessStoryRepository";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

export class GetSuccessStoryByIdUseCase {
  constructor(
    private successStoryRepository: SuccessStoryRepository
  ) {}

  async execute(id: string): Promise<SuccessStory> {
    const successStory = await this.successStoryRepository.findById(id);
    
    if (!successStory) {
      throw new ResourceNotFoundError("Success Story", id);
    }
    
    return successStory;
  }
}

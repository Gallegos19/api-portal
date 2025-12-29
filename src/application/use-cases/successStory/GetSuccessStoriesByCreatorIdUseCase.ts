import { SuccessStory } from "../../../domain/entities/SuccessStory";
import { SuccessStoryRepository } from "../../../domain/repositories/SuccessStoryRepository";

export class GetSuccessStoriesByCreatorIdUseCase {
  constructor(
    private successStoryRepository: SuccessStoryRepository
  ) {}

  async execute(creatorId: string): Promise<SuccessStory[]> {
    const successStories = await this.successStoryRepository.findByCreatorId(creatorId);
    return successStories;
  }
}

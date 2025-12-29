import { SuccessStory } from "../../../domain/entities/SuccessStory";
import { SuccessStoryRepository } from "../../../domain/repositories/SuccessStoryRepository";

export class GetAllSuccessStoriesUseCase {
  constructor(
    private successStoryRepository: SuccessStoryRepository
  ) {}

  async execute(): Promise<SuccessStory[]> {
    const successStories = await this.successStoryRepository.findAll();
    return successStories;
  }
}

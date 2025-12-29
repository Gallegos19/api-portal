import { SuccessStory } from "../entities/SuccessStory";

export interface SuccessStoryRepository {
  findById(id: string): Promise<SuccessStory | null>;
  findByCreatorId(creatorId: string): Promise<SuccessStory[]>;
  findAll(): Promise<SuccessStory[]>;
  save(successStory: SuccessStory): Promise<SuccessStory>;
  update(successStory: SuccessStory): Promise<SuccessStory>;
  delete(id: string): Promise<void>;
}
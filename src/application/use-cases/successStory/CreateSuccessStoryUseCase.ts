import { SuccessStory } from "../../../domain/entities/SuccessStory";
import { SuccessStoryRepository } from "../../../domain/repositories/SuccessStoryRepository";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { PhotoRepository } from "../../../domain/repositories/PhotoRepository";
import { CreateSuccessStoryDTO } from "../../dto/successStory/CreateSuccessStoryDTO";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

export class CreateSuccessStoryUseCase {
  constructor(
    private successStoryRepository: SuccessStoryRepository,
    private userRepository: UserRepository,
    private photoRepository: PhotoRepository
  ) {}

  async execute(data: CreateSuccessStoryDTO): Promise<SuccessStory> {
    // Verify if creator user exists
    const user = await this.userRepository.findById(data.created_by);
    
    if (!user) {
      throw new ResourceNotFoundError('User', data.created_by);
    }
    
    // Verify if photo exists when provided
    if (data.id_photo) {
      const photo = await this.photoRepository.findById(data.id_photo);
      
      if (!photo) {
        throw new ResourceNotFoundError('Photo', data.id_photo);
      }
    }
    
    // Create success story entity
    const successStory = SuccessStory.create({
      title: data.title,
      description: data.description,
      id_photo: data.id_photo,
      created_by: data.created_by
    });
    
    // Save the success story
    return this.successStoryRepository.save(successStory);
  }
}
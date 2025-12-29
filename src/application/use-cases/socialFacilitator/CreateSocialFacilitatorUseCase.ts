import { SocialFacilitator } from "../../../domain/entities/SocialFacilitator";
import { SocialFacilitatorRepository } from "../../../domain/repositories/SocialFacilitatorRepository";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { RegionRepository } from "../../../domain/repositories/RegionRepository";
import { CreateSocialFacilitatorDTO } from "../../dto/socialFacilitator/CreateSocialFacilitatorDTO";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

export class CreateSocialFacilitatorUseCase {
  constructor(
    private socialFacilitatorRepository: SocialFacilitatorRepository,
    private userRepository: UserRepository,
    private regionRepository: RegionRepository
  ) {}

  async execute(data: CreateSocialFacilitatorDTO): Promise<SocialFacilitator> {
    // Verify if user exists
    const user = await this.userRepository.findById(data.id_user);
    
    if (!user) {
      throw new ResourceNotFoundError('User', data.id_user);
    }
    
    // Check if the user is already a social facilitator
    const existingSocialFacilitator = await this.socialFacilitatorRepository.findByUserId(data.id_user);
    
    if (existingSocialFacilitator) {
      throw new Error(`User with ID ${data.id_user} is already a social facilitator`);
    }
    
    // Verify if region exists
    const region = await this.regionRepository.findById(data.id_region);
    
    if (!region) {
      throw new ResourceNotFoundError('Region', data.id_region);
    }
    
    // Create social facilitator entity
    const socialFacilitator = SocialFacilitator.create({
      id_user: data.id_user,
      id_region: data.id_region
    });
    
    // Save the social facilitator
    return this.socialFacilitatorRepository.save(socialFacilitator);
  }
}
import { SocialFacilitator } from "../../../domain/entities/SocialFacilitator";
import { SocialFacilitatorRepository } from "../../../domain/repositories/SocialFacilitatorRepository";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

export class GetSocialFacilitatorByUserIdUseCase {
  constructor(
    private socialFacilitatorRepository: SocialFacilitatorRepository
  ) {}

  async execute(userId: string): Promise<SocialFacilitator> {
    const socialFacilitator = await this.socialFacilitatorRepository.findByUserId(userId);
    
    if (!socialFacilitator) {
      throw new ResourceNotFoundError('Social Facilitator', userId);
    }
    
    return socialFacilitator;
  }
}

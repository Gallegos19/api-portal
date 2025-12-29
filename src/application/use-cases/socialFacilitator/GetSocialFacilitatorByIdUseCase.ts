import { SocialFacilitator } from "../../../domain/entities/SocialFacilitator";
import { SocialFacilitatorRepository } from "../../../domain/repositories/SocialFacilitatorRepository";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

export class GetSocialFacilitatorByIdUseCase {
  constructor(
    private socialFacilitatorRepository: SocialFacilitatorRepository
  ) {}

  async execute(id: string): Promise<SocialFacilitator> {
    const socialFacilitator = await this.socialFacilitatorRepository.findById(id);
    
    if (!socialFacilitator) {
      throw new ResourceNotFoundError('Social Facilitator', id);
    }
    
    return socialFacilitator;
  }
}

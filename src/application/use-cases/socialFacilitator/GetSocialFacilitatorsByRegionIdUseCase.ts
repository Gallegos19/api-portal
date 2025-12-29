import { ResourceNotFoundError } from "@shared/errors/CustomErrors";
import { SocialFacilitator } from "../../../domain/entities/SocialFacilitator";
import { SocialFacilitatorRepository } from "../../../domain/repositories/SocialFacilitatorRepository";

export class GetSocialFacilitatorsByRegionIdUseCase {
  constructor(
    private socialFacilitatorRepository: SocialFacilitatorRepository
  ) {}

  async execute(regionId: string): Promise<SocialFacilitator[]> {
    const socialFacilitators = await this.socialFacilitatorRepository.findByRegionId(regionId);
    if(!socialFacilitators){ 
      throw new ResourceNotFoundError('Social Facilitators for Region', regionId);
    }
    return socialFacilitators;
  }
}

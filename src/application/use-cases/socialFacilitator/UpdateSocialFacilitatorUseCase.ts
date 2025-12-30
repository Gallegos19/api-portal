import { SocialFacilitator } from "../../../domain/entities/SocialFacilitator";
import { SocialFacilitatorRepository } from "../../../domain/repositories/SocialFacilitatorRepository";
import { UpdateSocialFacilitatorDTO } from "../../dto/socialFacilitator/UpdateSocialFacilitatorDTO";

export class UpdateSocialFacilitatorUseCase {
  constructor(
    private socialFacilitatorRepository: SocialFacilitatorRepository
  ) {}

  async execute(id: string, data: UpdateSocialFacilitatorDTO): Promise<SocialFacilitator> {
    const socialFacilitator = await this.socialFacilitatorRepository.findById(id);
    
    if (!socialFacilitator) {
      throw new Error("Social Facilitator not found");
    }

    // Update social facilitator properties
    if (data.id_user) socialFacilitator.updateUserId(data.id_user);
    if (data.id_region) socialFacilitator.updateRegionId(data.id_region);

    return this.socialFacilitatorRepository.update(socialFacilitator);
  }
}

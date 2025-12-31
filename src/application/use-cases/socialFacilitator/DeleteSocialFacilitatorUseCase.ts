import { SocialFacilitatorRepository } from "../../../domain/repositories/SocialFacilitatorRepository";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

export class DeleteSocialFacilitatorUseCase {
  constructor(private socialFacilitatorRepository: SocialFacilitatorRepository) {}

  async execute(id: string): Promise<void> {
    const socialFacilitator = await this.socialFacilitatorRepository.findById(id);
    
    if (!socialFacilitator) {
      throw new ResourceNotFoundError("SocialFacilitator", id);
    }

    await this.socialFacilitatorRepository.softDelete(id);
  }
}

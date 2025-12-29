import { SocialFacilitator } from "../../../domain/entities/SocialFacilitator";
import { SocialFacilitatorRepository } from "../../../domain/repositories/SocialFacilitatorRepository";

export class GetAllSocialFacilitatorsUseCase {
  constructor(
    private socialFacilitatorRepository: SocialFacilitatorRepository
  ) {}

  async execute(): Promise<SocialFacilitator[]> {
    const socialFacilitators = await this.socialFacilitatorRepository.findAll();
    return socialFacilitators;
  }
}

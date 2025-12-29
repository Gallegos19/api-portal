import { SocialFacilitatorRepository } from "../../../domain/repositories/SocialFacilitatorRepository";
import { SocialFacilitator } from "../../../domain/entities/SocialFacilitator";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

export class GetSocialFacilitatorsBySubprojectIdUseCase {
  constructor(
    private socialFacilitatorRepository: SocialFacilitatorRepository
  ) {}

    async execute(subprojectId: string): Promise<SocialFacilitator[]> {
        const socialFacilitators = await this.socialFacilitatorRepository.findBySubprojectId(subprojectId); 
        if(!socialFacilitators){
            throw new ResourceNotFoundError('Social Facilitators for Subproject', subprojectId);
        }

        return socialFacilitators;
    }   
}
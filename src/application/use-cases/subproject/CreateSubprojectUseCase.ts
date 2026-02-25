import { Subproject } from "../../../domain/entities/Subproject";
import { SubprojectRepository } from "../../../domain/repositories/SubprojectRepository";
import { RegionRepository } from "../../../domain/repositories/RegionRepository";
import { CoordinatorRepository } from "../../../domain/repositories/CoordinatorRepository";
import { SocialFacilitatorRepository } from "../../../domain/repositories/SocialFacilitatorRepository";
import { CreateSubprojectDTO } from "../../dto/subproject/CreateSubprojectDTO";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

export class CreateSubprojectUseCase {
  constructor(
    private subprojectRepository: SubprojectRepository,
    private regionRepository: RegionRepository,
    private coordinatorRepository: CoordinatorRepository,
    private socialFacilitatorRepository: SocialFacilitatorRepository
  ) {}

  private normalizeOptionalId(value?: string): string | undefined {
    if (typeof value !== 'string') return undefined;
    const trimmed = value.trim();
    return trimmed.length > 0 ? trimmed : undefined;
  }

  async execute(data: CreateSubprojectDTO): Promise<Subproject> {
    const idRegion = this.normalizeOptionalId(data.id_region);
    const idSocialFacilitator = this.normalizeOptionalId(data.id_social_facilitator);
    const idCoordinator = this.normalizeOptionalId(data.id_coordinator);

    // Verify if region exists when provided
    if (idRegion) {
      const region = await this.regionRepository.findById(idRegion);
      
      if (!region) {
        throw new ResourceNotFoundError('Region', idRegion);
      }
    }
    
    // Verify if social facilitator exists when provided
    if (idSocialFacilitator) {
      const socialFacilitator = await this.socialFacilitatorRepository.findById(idSocialFacilitator);
      
      if (!socialFacilitator) {
        throw new ResourceNotFoundError('Social Facilitator', idSocialFacilitator);
      }
    }
    
    // Verify if coordinator exists when provided
    if (idCoordinator) {
      const coordinator = await this.coordinatorRepository.findById(idCoordinator);
      
      if (!coordinator) {
        throw new ResourceNotFoundError('Coordinator', idCoordinator);
      }
      
    }
    
    // Create subproject entity
    const subproject = Subproject.create({
      name_subproject: data.name_subproject,
      id_region: idRegion,
      id_social_facilitator: idSocialFacilitator,
      id_coordinator: idCoordinator
    });
    
    // Save the subproject
    return this.subprojectRepository.save(subproject);
  }
}
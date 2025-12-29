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

  async execute(data: CreateSubprojectDTO): Promise<Subproject> {
    // Verify if region exists when provided
    if (data.id_region) {
      const region = await this.regionRepository.findById(data.id_region);
      
      if (!region) {
        throw new ResourceNotFoundError('Region', data.id_region);
      }
    }
    
    // Verify if social facilitator exists when provided
    if (data.id_social_facilitator) {
      const socialFacilitator = await this.socialFacilitatorRepository.findById(data.id_social_facilitator);
      
      if (!socialFacilitator) {
        throw new ResourceNotFoundError('Social Facilitator', data.id_social_facilitator);
      }
    }
    
    // Verify if coordinator exists when provided
    if (data.id_coordinator) {
      const coordinator = await this.coordinatorRepository.findById(data.id_coordinator);
      
      if (!coordinator) {
        throw new ResourceNotFoundError('Coordinator', data.id_coordinator);
      }
      
      // Check if coordinator is already assigned to another subproject
      const existingSubproject = await this.subprojectRepository.findByCoordinatorId(data.id_coordinator);
      
      if (existingSubproject) {
        throw new Error(`Coordinator with ID ${data.id_coordinator} is already assigned to another subproject`);
      }
    }
    
    // Create subproject entity
    const subproject = Subproject.create({
      name_subproject: data.name_subproject,
      id_region: data.id_region,
      id_social_facilitator: data.id_social_facilitator,
      id_coordinator: data.id_coordinator
    });
    
    // Save the subproject
    return this.subprojectRepository.save(subproject);
  }
}
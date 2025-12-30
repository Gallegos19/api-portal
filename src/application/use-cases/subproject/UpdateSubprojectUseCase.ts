import { Subproject } from "../../../domain/entities/Subproject";
import { SubprojectRepository } from "../../../domain/repositories/SubprojectRepository";
import { UpdateSubprojectDTO } from "../../dto/subproject/UpdateSubprojectDTO";

export class UpdateSubprojectUseCase {
  constructor(
    private subprojectRepository: SubprojectRepository
  ) {}

  async execute(id: string, data: UpdateSubprojectDTO): Promise<Subproject> {
    const subproject = await this.subprojectRepository.findById(id);
    
    if (!subproject) {
      throw new Error("Subproject not found");
    }

    // Update subproject properties
    if (data.name_subproject) subproject.updateNameSubproject(data.name_subproject);
    if (data.id_region !== undefined) subproject.updateRegionId(data.id_region);
    if (data.id_social_facilitator !== undefined) subproject.updateSocialFacilitatorId(data.id_social_facilitator);
    if (data.id_coordinator !== undefined) subproject.updateCoordinatorId(data.id_coordinator);

    return this.subprojectRepository.update(subproject);
  }
}

import { Intern } from "../../../domain/entities/Intern";
import { InternRepository } from "../../../domain/repositories/InternRepository";
import { UpdateInternDTO } from "../../dto/intern/UpdateInternDTO";

export class UpdateInternUseCase {
  constructor(
    private internRepository: InternRepository
  ) {}

  async execute(id: string, data: UpdateInternDTO): Promise<Intern> {
    const intern = await this.internRepository.findById(id);
    
    if (!intern) {
      throw new Error("Intern not found");
    }

    // Update intern properties
    if (data.status !== undefined) intern.updateStatus(data.status);
    if (data.address) intern.updateAddress(data.address);
    if (data.education_level) intern.updateEducationLevel(data.education_level);
    if (data.career_name) intern.updateCareerName(data.career_name);
    if (data.grade) intern.updateGrade(data.grade);
    if (data.name_tutor) intern.updateNameTutor(data.name_tutor);
    if (data.service) intern.updateService(data.service);
    if (data.documentation) intern.updateDocumentation(data.documentation);
    if (data.id_subproject) intern.updateSubprojectId(data.id_subproject);
    if (data.id_social_facilitator) intern.updateSocialFacilitatorId(data.id_social_facilitator);

    return this.internRepository.update(intern);
  }
}

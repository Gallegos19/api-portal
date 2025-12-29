import { Subproject } from "../../../domain/entities/Subproject";
import { SubprojectRepository } from "../../../domain/repositories/SubprojectRepository";

export class GetAllSubprojectsUseCase {
  constructor(
    private subprojectRepository: SubprojectRepository
  ) {}

  async execute(): Promise<Subproject[]> {
    const subprojects = await this.subprojectRepository.findAll();
    return subprojects;
  }
}

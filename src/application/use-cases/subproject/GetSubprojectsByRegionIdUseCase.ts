import { Subproject } from "../../../domain/entities/Subproject";
import { SubprojectRepository } from "../../../domain/repositories/SubprojectRepository";

export class GetSubprojectsByRegionIdUseCase {
  constructor(
    private subprojectRepository: SubprojectRepository
  ) {}

  async execute(regionId: string): Promise<Subproject[]> {
    const subprojects = await this.subprojectRepository.findByRegionId(regionId);
    return subprojects;
  }
}

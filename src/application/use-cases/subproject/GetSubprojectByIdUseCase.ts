import { Subproject } from "../../../domain/entities/Subproject";
import { SubprojectRepository } from "../../../domain/repositories/SubprojectRepository";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

export class GetSubprojectByIdUseCase {
  constructor(
    private subprojectRepository: SubprojectRepository
  ) {}

  async execute(id: string): Promise<Subproject> {
    const subproject = await this.subprojectRepository.findById(id);
    
    if (!subproject) {
      throw new ResourceNotFoundError("Subproject", id);
    }
    
    return subproject;
  }
}

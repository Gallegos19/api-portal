import { Intern } from "../../../domain/entities/Intern";
import { InternRepository } from "../../../domain/repositories/InternRepository";

export class GetInternsBySocialFacilitatorIdUseCase {
  constructor(
    private internRepository: InternRepository
  ) {}

  async execute(socialFacilitatorId: string): Promise<Intern[]> {
    const interns = await this.internRepository.findBySocialFacilitatorId(socialFacilitatorId);
    return interns;
  }
}

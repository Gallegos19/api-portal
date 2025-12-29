import { Intern } from "../../../domain/entities/Intern";
import { InternRepository } from "../../../domain/repositories/InternRepository";

export class GetInternsBySubprojectIdUseCase {
  constructor(
    private internRepository: InternRepository
  ) {}

  async execute(subprojectId: string): Promise<Intern[]> {
    const interns = await this.internRepository.findBySubprojectId(subprojectId);
    return interns;
  }
}

import { Intern } from "../../../domain/entities/Intern";
import { InternRepository } from "../../../domain/repositories/InternRepository";

export class GetAllInternsUseCase {
  constructor(
    private internRepository: InternRepository
  ) {}

  async execute(): Promise<Intern[]> {
    const interns = await this.internRepository.findAll();
    return interns;
  }
}

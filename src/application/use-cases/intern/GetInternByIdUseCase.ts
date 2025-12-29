import { Intern } from "../../../domain/entities/Intern";
import { InternRepository } from "../../../domain/repositories/InternRepository";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

export class GetInternByIdUseCase {
  constructor(
    private internRepository: InternRepository
  ) {}

  async execute(id: string): Promise<Intern> {
    const intern = await this.internRepository.findById(id);
    
    if (!intern) {
      throw new ResourceNotFoundError("Intern", id);
    }
    
    return intern;
  }
}

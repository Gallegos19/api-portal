import { InternRepository } from "../../../domain/repositories/InternRepository";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

export class DeleteInternUseCase {
  constructor(private internRepository: InternRepository) {}

  async execute(id: string): Promise<void> {
    const intern = await this.internRepository.findById(id);
    
    if (!intern) {
      throw new ResourceNotFoundError("Intern", id);
    }

    await this.internRepository.softDelete(id);
  }
}

import { Intern } from "../../../domain/entities/Intern";
import { InternRepository } from "../../../domain/repositories/InternRepository";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

export class GetInternByUserIdUseCase {
  constructor(
    private internRepository: InternRepository
  ) {}

  async execute(userId: string): Promise<Intern> {
    const intern = await this.internRepository.findByUserId(userId);
    
    if (!intern) {
      throw new ResourceNotFoundError('Intern', userId);
    }
    
    return intern;
  }
}

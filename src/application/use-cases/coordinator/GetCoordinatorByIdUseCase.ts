import { Coordinator } from "../../../domain/entities/Coordinator";
import { CoordinatorRepository } from "../../../domain/repositories/CoordinatorRepository";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

export class GetCoordinatorByIdUseCase {
  constructor(
    private coordinatorRepository: CoordinatorRepository
  ) {}

  async execute(id: string): Promise<Coordinator> {
    const coordinator = await this.coordinatorRepository.findById(id);
    
    if (!coordinator) {
      throw new ResourceNotFoundError('Coordinator', id);
    }
    
    return coordinator;
  }
}

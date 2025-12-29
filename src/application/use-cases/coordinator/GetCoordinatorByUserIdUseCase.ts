import { Coordinator } from "../../../domain/entities/Coordinator";
import { CoordinatorRepository } from "../../../domain/repositories/CoordinatorRepository";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

export class GetCoordinatorByUserIdUseCase {
  constructor(
    private coordinatorRepository: CoordinatorRepository
  ) {}

  async execute(userId: string): Promise<Coordinator> {
    const coordinator = await this.coordinatorRepository.findByUserId(userId);
    
    if (!coordinator) {
      throw new ResourceNotFoundError('Coordinator', userId);
    }
    
    return coordinator;
  }
}

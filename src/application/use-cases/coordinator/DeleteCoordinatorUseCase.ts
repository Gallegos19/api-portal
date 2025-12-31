import { CoordinatorRepository } from "../../../domain/repositories/CoordinatorRepository";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

export class DeleteCoordinatorUseCase {
  constructor(private coordinatorRepository: CoordinatorRepository) {}

  async execute(id: string): Promise<void> {
    const coordinator = await this.coordinatorRepository.findById(id);
    
    if (!coordinator) {
      throw new ResourceNotFoundError("Coordinator", id);
    }

    await this.coordinatorRepository.softDelete(id);
  }
}

import { Coordinator } from "../../../domain/entities/Coordinator";
import { CoordinatorRepository } from "../../../domain/repositories/CoordinatorRepository";

export class GetAllCoordinatorsUseCase {
  constructor(
    private coordinatorRepository: CoordinatorRepository
  ) {}

  async execute(): Promise<Coordinator[]> {
    const coordinators = await this.coordinatorRepository.findAll();
    return coordinators;
  }
}

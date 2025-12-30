import { Coordinator } from "../../../domain/entities/Coordinator";
import { CoordinatorRepository } from "../../../domain/repositories/CoordinatorRepository";
import { UpdateCoordinatorDTO } from "../../dto/coordinator/UpdateCoordinatorDTO";

export class UpdateCoordinatorUseCase {
  constructor(
    private coordinatorRepository: CoordinatorRepository
  ) {}

  async execute(id: string, data: UpdateCoordinatorDTO): Promise<Coordinator> {
    const coordinator = await this.coordinatorRepository.findById(id);
    
    if (!coordinator) {
      throw new Error("Coordinator not found");
    }

    // Update coordinator properties
    if (data.id_user) coordinator.updateUserId(data.id_user);
    if (data.id_region) coordinator.updateRegionId(data.id_region);

    return this.coordinatorRepository.update(coordinator);
  }
}

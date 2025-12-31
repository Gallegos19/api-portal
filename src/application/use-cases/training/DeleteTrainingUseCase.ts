import { TrainingRepository } from "../../../domain/repositories/TrainingRepository";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

export class DeleteTrainingUseCase {
  constructor(private trainingRepository: TrainingRepository) {}

  async execute(id: string): Promise<void> {
    const training = await this.trainingRepository.findById(id);
    
    if (!training) {
      throw new ResourceNotFoundError("Training", id);
    }

    await this.trainingRepository.softDelete(id);
  }
}

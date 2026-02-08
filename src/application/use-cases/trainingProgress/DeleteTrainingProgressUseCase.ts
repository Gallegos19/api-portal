import { TrainingProgressRepository } from "../../../domain/repositories/TrainingProgressRepository";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

export class DeleteTrainingProgressUseCase {
  constructor(private trainingProgressRepository: TrainingProgressRepository) {}

  async execute(id: string): Promise<void> {
    const trainingProgress = await this.trainingProgressRepository.findById(id);
    
    if (!trainingProgress) {
      throw new ResourceNotFoundError('TrainingProgress', id);
    }
    
    await this.trainingProgressRepository.delete(id);
  }
}

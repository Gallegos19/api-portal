import { TrainingProgress } from "../../../domain/entities/TrainingProgress";
import { TrainingProgressRepository } from "../../../domain/repositories/TrainingProgressRepository";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

export class GetTrainingProgressByIdUseCase {
  constructor(private trainingProgressRepository: TrainingProgressRepository) {}

  async execute(id: string): Promise<TrainingProgress> {
    const trainingProgress = await this.trainingProgressRepository.findById(id);
    
    if (!trainingProgress) {
      throw new ResourceNotFoundError('TrainingProgress', id);
    }
    
    return trainingProgress;
  }
}

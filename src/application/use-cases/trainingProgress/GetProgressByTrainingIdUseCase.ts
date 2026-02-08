import { TrainingProgress } from "../../../domain/entities/TrainingProgress";
import { TrainingProgressRepository } from "../../../domain/repositories/TrainingProgressRepository";

export class GetProgressByTrainingIdUseCase {
  constructor(private trainingProgressRepository: TrainingProgressRepository) {}

  async execute(trainingId: string): Promise<TrainingProgress[]> {
    return this.trainingProgressRepository.findByTrainingId(trainingId);
  }
}

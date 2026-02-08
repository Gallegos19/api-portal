import { TrainingProgress } from "../../../domain/entities/TrainingProgress";
import { TrainingProgressRepository } from "../../../domain/repositories/TrainingProgressRepository";

export class GetAllTrainingProgressUseCase {
  constructor(private trainingProgressRepository: TrainingProgressRepository) {}

  async execute(): Promise<TrainingProgress[]> {
    return this.trainingProgressRepository.findAll();
  }
}

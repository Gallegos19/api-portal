import { TrainingProgress } from "../../../domain/entities/TrainingProgress";
import { TrainingProgressRepository } from "../../../domain/repositories/TrainingProgressRepository";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

export class GetProgressByTrainingAndUserUseCase {
  constructor(private trainingProgressRepository: TrainingProgressRepository) {}

  async execute(trainingId: string, userId: string): Promise<TrainingProgress | null> {
    return this.trainingProgressRepository.findByTrainingAndUser(trainingId, userId);
  }
}

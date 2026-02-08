import { TrainingProgress } from "../../../domain/entities/TrainingProgress";
import { TrainingProgressRepository } from "../../../domain/repositories/TrainingProgressRepository";

export class GetProgressByUserIdUseCase {
  constructor(private trainingProgressRepository: TrainingProgressRepository) {}

  async execute(userId: string): Promise<TrainingProgress[]> {
    return this.trainingProgressRepository.findByUserId(userId);
  }
}

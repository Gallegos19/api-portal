import { Training } from "../../../domain/entities/Training";
import { TrainingRepository } from "../../../domain/repositories/TrainingRepository";

export class GetTrainingsByCreatorIdUseCase {
  constructor(
    private trainingRepository: TrainingRepository
  ) {}

  async execute(creatorId: string): Promise<Training[]> {
    const trainings = await this.trainingRepository.findByCreatorId(creatorId);
    return trainings;
  }
}

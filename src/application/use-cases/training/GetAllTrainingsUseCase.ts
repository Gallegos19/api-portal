import { Training } from "../../../domain/entities/Training";
import { TrainingRepository } from "../../../domain/repositories/TrainingRepository";

export class GetAllTrainingsUseCase {
  constructor(
    private trainingRepository: TrainingRepository
  ) {}

  async execute(): Promise<Training[]> {
    const trainings = await this.trainingRepository.findAll();
    return trainings;
  }
}

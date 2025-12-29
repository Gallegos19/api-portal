import { Training } from "../../../domain/entities/Training";
import { TrainingRepository } from "../../../domain/repositories/TrainingRepository";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

export class GetTrainingByIdUseCase {
  constructor(
    private trainingRepository: TrainingRepository
  ) {}

  async execute(id: string): Promise<Training> {
    const training = await this.trainingRepository.findById(id);
    
    if (!training) {
      throw new ResourceNotFoundError('Training', id);
    }
    
    return training;
  }
}

import { Training } from "../../../domain/entities/Training";
import { TrainingRepository } from "../../../domain/repositories/TrainingRepository";
import { UpdateTrainingDTO } from "../../dto/training/UpdateTrainingDTO";

export class UpdateTrainingUseCase {
  constructor(
    private trainingRepository: TrainingRepository
  ) {}

  async execute(id: string, data: UpdateTrainingDTO): Promise<Training> {
    const training = await this.trainingRepository.findById(id);
    
    if (!training) {
      throw new Error("Training not found");
    }

    // Update training properties
    if (data.title) training.updateTitle(data.title);
    if (data.description !== undefined) training.updateDescription(data.description);
    if (data.id_archive !== undefined) training.updateArchiveId(data.id_archive);
    if (data.target_audience !== undefined) training.updateTargetAudience(data.target_audience);

    return this.trainingRepository.update(training);
  }
}

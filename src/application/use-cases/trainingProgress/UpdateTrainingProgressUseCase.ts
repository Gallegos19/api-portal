import { TrainingProgress } from "../../../domain/entities/TrainingProgress";
import { TrainingProgressRepository } from "../../../domain/repositories/TrainingProgressRepository";
import { UpdateTrainingProgressDTO } from "../../dto/trainingProgress/UpdateTrainingProgressDTO";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

export class UpdateTrainingProgressUseCase {
  constructor(private trainingProgressRepository: TrainingProgressRepository) {}

  async execute(id: string, data: UpdateTrainingProgressDTO): Promise<TrainingProgress> {
    const trainingProgress = await this.trainingProgressRepository.findById(id);
    
    if (!trainingProgress) {
      throw new ResourceNotFoundError('TrainingProgress', id);
    }

    // Actualizar porcentaje de progreso si se proporciona
    if (data.progress_percentage !== undefined) {
      trainingProgress.updateProgressPercentage(data.progress_percentage);
    }

    // Marcar como completado si se solicita
    if (data.completed === true && !trainingProgress.completed) {
      trainingProgress.markAsCompleted();
    }

    return this.trainingProgressRepository.update(trainingProgress);
  }
}

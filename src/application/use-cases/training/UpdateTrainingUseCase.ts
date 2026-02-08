import { Training } from "../../../domain/entities/Training";
import { TrainingRepository } from "../../../domain/repositories/TrainingRepository";
import { UpdateTrainingDTO } from "../../dto/training/UpdateTrainingDTO";

// Helper para convertir string HH:MM a Date
function parseTimeString(timeStr: string): Date {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
}

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
    if (data.url !== undefined) training.updateUrl(data.url);
    if (data.tiempo !== undefined) {
      const tiempoDate = typeof data.tiempo === 'string' ? parseTimeString(data.tiempo) : data.tiempo;
      training.updateTiempo(tiempoDate);
    }
    if (data.target_audience !== undefined) training.updateTargetAudience(data.target_audience);
    if (data.status_id !== undefined) training.updateStatusId(data.status_id);
    if (data.school_year_id !== undefined) training.updateSchoolYearId(data.school_year_id);

    return this.trainingRepository.update(training);
  }
}

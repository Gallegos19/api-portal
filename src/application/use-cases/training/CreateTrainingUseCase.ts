import { Training } from "../../../domain/entities/Training";
import { TrainingRepository } from "../../../domain/repositories/TrainingRepository";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { CreateTrainingDTO } from "../../dto/training/CreateTrainingDTO";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

// Helper para convertir string HH:MM a Date
function parseTimeString(timeStr: string): Date {
  const [hours, minutes] = timeStr.split(':').map(Number);
  const date = new Date();
  date.setHours(hours, minutes, 0, 0);
  return date;
}

export class CreateTrainingUseCase {
  constructor(
    private trainingRepository: TrainingRepository,
    private userRepository: UserRepository
  ) {}

  async execute(data: CreateTrainingDTO): Promise<Training> {
    // Verify if creator user exists
    const user = await this.userRepository.findById(data.created_by);
    
    if (!user) {
      throw new ResourceNotFoundError('User', data.created_by);
    }
    
    // Convert tiempo string to Date if needed
    let tiempoDate: Date | undefined;
    if (data.tiempo) {
      tiempoDate = typeof data.tiempo === 'string' ? parseTimeString(data.tiempo) : data.tiempo;
    }
    
    // Create training entity
    const training = Training.create({
      title: data.title,
      description: data.description,
      url: data.url,
      tiempo: tiempoDate,
      target_audience: data.target_audience,
      created_by: data.created_by,
      status_id: data.status_id,
      school_year_id: data.school_year_id
    });
    
    // Save the training
    return this.trainingRepository.save(training);
  }
}
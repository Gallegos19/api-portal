import { Training } from "../../../domain/entities/Training";
import { TrainingRepository } from "../../../domain/repositories/TrainingRepository";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { ArchiveRepository } from "../../../domain/repositories/ArchiveRepository";
import { CreateTrainingDTO } from "../../dto/training/CreateTrainingDTO";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

export class CreateTrainingUseCase {
  constructor(
    private trainingRepository: TrainingRepository,
    private userRepository: UserRepository,
    private archiveRepository: ArchiveRepository
  ) {}

  async execute(data: CreateTrainingDTO): Promise<Training> {
    // Verify if creator user exists
    const user = await this.userRepository.findById(data.created_by);
    
    if (!user) {
      throw new ResourceNotFoundError('User', data.created_by);
    }
    
    // Verify if archive exists when provided
    if (data.id_archive) {
      const archive = await this.archiveRepository.findById(data.id_archive);
      
      if (!archive) {
        throw new ResourceNotFoundError('Archive', data.id_archive);
      }
    }
    
    // Create training entity
    const training = Training.create({
      title: data.title,
      description: data.description,
      id_archive: data.id_archive,
      target_audience: data.target_audience,
      created_by: data.created_by
    });
    
    // Save the training
    return this.trainingRepository.save(training);
  }
}
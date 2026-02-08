import { TrainingProgress } from "../../../domain/entities/TrainingProgress";
import { TrainingProgressRepository } from "../../../domain/repositories/TrainingProgressRepository";
import { TrainingRepository } from "../../../domain/repositories/TrainingRepository";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { CreateTrainingProgressDTO } from "../../dto/trainingProgress/CreateTrainingProgressDTO";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

export class CreateTrainingProgressUseCase {
  constructor(
    private trainingProgressRepository: TrainingProgressRepository,
    private trainingRepository: TrainingRepository,
    private userRepository: UserRepository
  ) {}

  async execute(data: CreateTrainingProgressDTO): Promise<TrainingProgress> {
    // Verificar que el training existe
    const training = await this.trainingRepository.findById(data.id_training);
    if (!training) {
      throw new ResourceNotFoundError('Training', data.id_training);
    }

    // Verificar que el usuario existe
    const user = await this.userRepository.findById(data.id_user);
    if (!user) {
      throw new ResourceNotFoundError('User', data.id_user);
    }

    // Verificar si ya existe un progreso para este usuario y training
    const existingProgress = await this.trainingProgressRepository.findByTrainingAndUser(
      data.id_training,
      data.id_user
    );

    if (existingProgress) {
      throw new Error('Progress already exists for this user and training');
    }

    // Crear el progreso
    const trainingProgress = TrainingProgress.create({
      id_training: data.id_training,
      id_user: data.id_user,
      completed: false,
      progress_percentage: data.progress_percentage ?? 0
    });

    return this.trainingProgressRepository.save(trainingProgress);
  }
}

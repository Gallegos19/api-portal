import { TrainingProgress } from "../entities/TrainingProgress";

export interface TrainingProgressRepository {
  findById(id: string): Promise<TrainingProgress | null>;
  findByTrainingId(trainingId: string): Promise<TrainingProgress[]>;
  findByUserId(userId: string): Promise<TrainingProgress[]>;
  findByTrainingAndUser(trainingId: string, userId: string): Promise<TrainingProgress | null>;
  findAll(): Promise<TrainingProgress[]>;
  save(trainingProgress: TrainingProgress): Promise<TrainingProgress>;
  update(trainingProgress: TrainingProgress): Promise<TrainingProgress>;
  delete(id: string): Promise<void>;
}

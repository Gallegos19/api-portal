import { TrainingProgress } from "../../domain/entities/TrainingProgress";
import { TrainingProgressRepository } from "../../domain/repositories/TrainingProgressRepository";
import prisma from "../database/prisma/client";

export class PrismaTrainingProgressRepository implements TrainingProgressRepository {
  async findById(id: string): Promise<TrainingProgress | null> {
    try {
      const record = await prisma.trainingProgress.findUnique({ 
        where: { id },
        include: { 
          training: true,
          user: true
        }
      });
      return record ? this.mapToDomain(record) : null;
    } catch (error) {
      console.error("Error in findById:", error);
      return null;
    }
  }

  async findByTrainingId(trainingId: string): Promise<TrainingProgress[]> {
    try {
      const records = await prisma.trainingProgress.findMany({ 
        where: { id_training: trainingId },
        include: { 
          training: true,
          user: true
        },
        orderBy: { last_viewed_at: 'desc' }
      });
      return records.map(this.mapToDomain);
    } catch (error) {
      console.error("Error in findByTrainingId:", error);
      return [];
    }
  }

  async findByUserId(userId: string): Promise<TrainingProgress[]> {
    try {
      const records = await prisma.trainingProgress.findMany({ 
        where: { id_user: userId },
        include: { 
          training: true,
          user: true
        },
        orderBy: { last_viewed_at: 'desc' }
      });
      return records.map(this.mapToDomain);
    } catch (error) {
      console.error("Error in findByUserId:", error);
      return [];
    }
  }

  async findByTrainingAndUser(trainingId: string, userId: string): Promise<TrainingProgress | null> {
    try {
      const record = await prisma.trainingProgress.findUnique({ 
        where: { 
          id_training_id_user: {
            id_training: trainingId,
            id_user: userId
          }
        },
        include: { 
          training: true,
          user: true
        }
      });
      return record ? this.mapToDomain(record) : null;
    } catch (error) {
      console.error("Error in findByTrainingAndUser:", error);
      return null;
    }
  }

  async findAll(): Promise<TrainingProgress[]> {
    try {
      const records = await prisma.trainingProgress.findMany({
        include: { 
          training: true,
          user: true
        },
        orderBy: { last_viewed_at: 'desc' }
      });
      return records.map(this.mapToDomain);
    } catch (error) {
      console.error("Error in findAll:", error);
      return [];
    }
  }

  async save(trainingProgress: TrainingProgress): Promise<TrainingProgress> {
    try {
      const data = trainingProgress.toJSON();

      const savedRecord = await prisma.trainingProgress.create({
        data: {
          id: data.id,
          id_training: data.id_training,
          id_user: data.id_user,
          completed: data.completed,
          progress_percentage: data.progress_percentage,
          completed_at: data.completed_at,
          started_at: data.started_at,
          last_viewed_at: data.last_viewed_at
        },
        include: { 
          training: true,
          user: true
        }
      });

      return this.mapToDomain(savedRecord);
    } catch (error) {
      console.error("Error in save:", error);
      throw new Error("Failed to save training progress");
    }
  }

  async update(trainingProgress: TrainingProgress): Promise<TrainingProgress> {
    try {
      const data = trainingProgress.toJSON();

      const updatedRecord = await prisma.trainingProgress.update({
        where: { id: data.id },
        data: {
          completed: data.completed,
          progress_percentage: data.progress_percentage,
          completed_at: data.completed_at,
          last_viewed_at: data.last_viewed_at
        },
        include: { 
          training: true,
          user: true
        }
      });

      return this.mapToDomain(updatedRecord);
    } catch (error) {
      console.error("Error in update:", error);
      throw new Error("Failed to update training progress");
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await prisma.trainingProgress.delete({ where: { id } });
    } catch (error) {
      console.error("Error in delete:", error);
      throw new Error("Failed to delete training progress");
    }
  }

  private mapToDomain(record: any): TrainingProgress {
    return TrainingProgress.create({
      id: record.id,
      id_training: record.id_training,
      id_user: record.id_user,
      completed: record.completed,
      progress_percentage: record.progress_percentage ?? 0,
      completed_at: record.completed_at,
      started_at: record.started_at,
      last_viewed_at: record.last_viewed_at
    });
  }
}

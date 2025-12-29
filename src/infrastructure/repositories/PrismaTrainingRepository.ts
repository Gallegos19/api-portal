import { Training } from "../../domain/entities/Training";
import { TrainingRepository } from "../../domain/repositories/TrainingRepository";
import prisma from "../database/prisma/client";

export class PrismaTrainingRepository implements TrainingRepository {
  async findById(id: string): Promise<Training | null> {
    try {
      const trainingRecord = await prisma.training.findUnique({ where: { id } });
      return trainingRecord ? this.mapToDomain(trainingRecord) : null;
    } catch (error) {
      console.error("Error in findById:", error);
      return null;
    }
  }

  async findByCreatorId(creatorId: string): Promise<Training[]> {
    try {
      const trainingRecords = await prisma.training.findMany({ where: { created_by: creatorId } });
      return trainingRecords.map(this.mapToDomain);
    } catch (error) {
      console.error("Error in findByCreatorId:", error);
      return [];
    }
  }

  async findAll(): Promise<Training[]> {
    try {
      const trainingRecords = await prisma.training.findMany();
      return trainingRecords.map(this.mapToDomain);
    } catch (error) {
      console.error("Error in findAll:", error);
      return [];
    }
  }

  async findPaginated(page: number, limit: number): Promise<Training[]> {
    try {
      const skip = (page - 1) * limit;
      const trainingRecords = await prisma.training.findMany({
        skip,
        take: limit,
        orderBy: { created_at: 'desc' }
      });

      return trainingRecords.map(this.mapToDomain);
    } catch (error) {
      console.error("Error in findPaginated:", error);
      return [];
    }
  }

  async save(training: Training): Promise<Training> {
    try {
      const data = training.toJSON();
      const savedRecord = await prisma.training.create({
        data: {
          id: data.id,
          title: data.title,
          description: data.description,
          id_archive: data.id_archive,
          target_audience: data.target_audience,
          created_at: data.created_at,
          created_by: data.created_by
        }
      });
      return this.mapToDomain(savedRecord);
    } catch (error) {
      console.error("Error in save:", error);
      throw error;
    }
  }

  async update(training: Training): Promise<Training> {
    try {
      const data = training.toJSON();
      const updatedRecord = await prisma.training.update({
        where: { id: data.id },
        data: {
          title: data.title,
          description: data.description,
          id_archive: data.id_archive,
          target_audience: data.target_audience
        }
      });
      return this.mapToDomain(updatedRecord);
    } catch (error) {
      console.error("Error in update:", error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await prisma.training.delete({ where: { id } });
    } catch (error) {
      console.error("Error in delete:", error);
      throw error;
    }
  }

  private mapToDomain(record: any): Training {
    return Training.create({
      id: record.id,
      title: record.title,
      description: record.description ?? undefined,
      id_archive: record.id_archive ?? undefined,
      target_audience: record.target_audience ?? undefined,
      created_at: record.created_at,
      created_by: record.created_by
    });
  }
}

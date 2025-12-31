import { SuccessStory } from "../../domain/entities/SuccessStory";
import { SuccessStoryRepository } from "../../domain/repositories/SuccessStoryRepository";
import prisma from "../database/prisma/client";

export class PrismaSuccessStoryRepository implements SuccessStoryRepository {
  async findById(id: string): Promise<SuccessStory | null> {
    try {
      const record = await prisma.successStory.findUnique({ 
        where: { id },
        include: { 
          status: true,
          school_year: true
        }
      });
      return record ? this.mapToDomain(record) : null;
    } catch (error) {
      console.error("Error in findById:", error);
      return null;
    }
  }

  async findByCreatorId(creatorId: string): Promise<SuccessStory[]> {
    try {
      const records = await prisma.successStory.findMany({ 
        where: { 
          created_by: creatorId,
          status: { name: { not: 'Eliminado' } }
        },
        include: { 
          status: true,
          school_year: true
        }
      });
      return records.map(this.mapToDomain);
    } catch (error) {
      console.error("Error in findByCreatorId:", error);
      return [];
    }
  }

  async findAll(): Promise<SuccessStory[]> {
    try {
      const records = await prisma.successStory.findMany({
        where: {
          status: { name: { not: 'Eliminado' } }
        },
        include: { 
          status: true,
          school_year: true
        }
      });
      return records.map(this.mapToDomain);
    } catch (error) {
      console.error("Error in findAll:", error);
      return [];
    }
  }

  async findPaginated(page: number, limit: number): Promise<SuccessStory[]> {
    try {
      const skip = (page - 1) * limit;
      const records = await prisma.successStory.findMany({
        where: {
          status: { name: { not: 'Eliminado' } }
        },
        skip,
        take: limit,
        orderBy: { created_at: 'desc' },
        include: { 
          status: true,
          school_year: true
        }
      });
      return records.map(this.mapToDomain);
    } catch (error) {
      console.error("Error in findPaginated:", error);
      return [];
    }
  }

  async findByTitleContains(query: string): Promise<SuccessStory[]> {
    try {
      const records = await prisma.successStory.findMany({
        where: {
          title: {
            contains: query,
            mode: "insensitive" // para que no distinga mayúsculas/minúsculas
          },
          status: { name: { not: 'Eliminado' } }
        },
        orderBy: { created_at: 'desc' },
        include: { 
          status: true,
          school_year: true
        }
      });
      return records.map(this.mapToDomain);
    } catch (error) {
      console.error("Error in findByTitleContains:", error);
      return [];
    }
  }

  async save(successStory: SuccessStory): Promise<SuccessStory> {
    try {
      const data = successStory.toJSON();

      let statusId = data.status_id;
      if (!statusId) {
        const activeStatus = await prisma.status.findUnique({ where: { name: 'Activo' } });
        statusId = activeStatus?.id;
      }

      const saved = await prisma.successStory.create({
        data: {
          id: data.id,
          title: data.title,
          description: data.description,
          id_photo: data.id_photo,
          created_at: data.created_at,
          created_by: data.created_by,
          status_id: statusId,
          school_year_id: data.school_year_id
        },
        include: { 
          status: true,
          school_year: true
        }
      });
      return this.mapToDomain(saved);
    } catch (error) {
      console.error("Error in save:", error);
      throw error;
    }
  }

  async update(successStory: SuccessStory): Promise<SuccessStory> {
    try {
      const data = successStory.toJSON();
      const updated = await prisma.successStory.update({
        where: { id: data.id },
        data: {
          title: data.title,
          description: data.description,
          id_photo: data.id_photo,
          status_id: data.status_id,
          school_year_id: data.school_year_id
        },
        include: { 
          status: true,
          school_year: true
        }
      });
      return this.mapToDomain(updated);
    } catch (error) {
      console.error("Error in update:", error);
      throw error;
    }
  }

  async softDelete(id: string): Promise<void> {
    const deletedStatus = await prisma.status.findUnique({ where: { name: 'Eliminado' } });
    if (deletedStatus) {
      await prisma.successStory.update({
        where: { id },
        data: { status_id: deletedStatus.id }
      });
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await prisma.successStory.delete({ where: { id } });
    } catch (error) {
      console.error("Error in delete:", error);
      throw error;
    }
  }

  private mapToDomain(record: any): SuccessStory {
    return SuccessStory.create({
      id: record.id,
      title: record.title,
      description: record.description ?? undefined,
      id_photo: record.id_photo ?? undefined,
      created_at: record.created_at,
      created_by: record.created_by,
      status_id: record.status_id ?? undefined,
      school_year_id: record.school_year_id ?? undefined
    });
  }
}

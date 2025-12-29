import { Subproject } from "../../domain/entities/Subproject";
import { SubprojectRepository } from "../../domain/repositories/SubprojectRepository";
import prisma from "../database/prisma/client";

export class PrismaSubprojectRepository implements SubprojectRepository {
  async findById(id: string): Promise<Subproject | null> {
    try {
      const record = await prisma.subproject.findUnique({ where: { id } });
      return record ? this.mapToDomain(record) : null;
    } catch (error) {
      console.error("Error in findById:", error);
      return null;
    }
  }

  async findByRegionId(regionId: string): Promise<Subproject[]> {
    try {
      const records = await prisma.subproject.findMany({ where: { id_region: regionId } });
      return records.map(this.mapToDomain);
    } catch (error) {
      console.error("Error in findByRegionId:", error);
      return [];
    }
  }

  async findByCoordinatorId(coordinatorId: string): Promise<Subproject | null> {
    try {
      const record = await prisma.subproject.findFirst({ where: { id_coordinator: coordinatorId } });
      return record ? this.mapToDomain(record) : null;
    } catch (error) {
      console.error("Error in findByCoordinatorId:", error);
      return null;
    }
  }

  async findAll(): Promise<Subproject[]> {
    try {
      const records = await prisma.subproject.findMany();
      return records.map(this.mapToDomain);
    } catch (error) {
      console.error("Error in findAll:", error);
      return [];
    }
  }

  async findPaginated(page: number, limit: number): Promise<{ data: Subproject[]; total: number }> {
    try {
      const skip = (page - 1) * limit;

      const [records, total] = await Promise.all([
        prisma.subproject.findMany({
          skip,
          take: limit,
          orderBy: { name_subproject: "asc" }
        }),
        prisma.subproject.count()
      ]);

      return {
        data: records.map(this.mapToDomain),
        total
      };
    } catch (error) {
      console.error("Error in findPaginated:", error);
      return { data: [], total: 0 };
    }
  }

  async findByNameContains(query: string): Promise<Subproject[]> {
    try {
      const records = await prisma.subproject.findMany({
        where: {
          name_subproject: {
            contains: query,
            mode: "insensitive"
          }
        },
        orderBy: { name_subproject: "asc" }
      });
      return records.map(this.mapToDomain);
    } catch (error) {
      console.error("Error in findByNameContains:", error);
      return [];
    }
  }

  async save(subproject: Subproject): Promise<Subproject> {
    try {
      const data = subproject.toJSON();
      const saved = await prisma.subproject.create({
        data: {
          id: data.id,
          name_subproject: data.name_subproject,
          id_region: data.id_region,
          id_social_facilitator: data.id_social_facilitator,
          id_coordinator: data.id_coordinator
        }
      });
      return this.mapToDomain(saved);
    } catch (error) {
      console.error("Error in save:", error);
      throw error;
    }
  }

  async update(subproject: Subproject): Promise<Subproject> {
    try {
      const data = subproject.toJSON();
      const updated = await prisma.subproject.update({
        where: { id: data.id },
        data: {
          name_subproject: data.name_subproject,
          id_region: data.id_region,
          id_social_facilitator: data.id_social_facilitator,
          id_coordinator: data.id_coordinator
        }
      });
      return this.mapToDomain(updated);
    } catch (error) {
      console.error("Error in update:", error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await prisma.subproject.delete({ where: { id } });
    } catch (error) {
      console.error("Error in delete:", error);
      throw error;
    }
  }

  private mapToDomain(record: any): Subproject {
    return Subproject.create({
      id: record.id,
      name_subproject: record.name_subproject,
      id_region: record.id_region ?? undefined,
      id_social_facilitator: record.id_social_facilitator ?? undefined,
      id_coordinator: record.id_coordinator ?? undefined
    });
  }
}

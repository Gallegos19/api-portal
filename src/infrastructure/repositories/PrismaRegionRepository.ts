import { Region } from "../../domain/entities/Region";
import { RegionRepository } from "../../domain/repositories/RegionRepository";
import prisma from "../database/prisma/client";

export class PrismaRegionRepository implements RegionRepository {
  async findById(id: string): Promise<Region | null> {
    const regionRecord = await prisma.region.findUnique({
      where: { id }
    });

    if (!regionRecord) return null;

    return Region.create({
      id: regionRecord.id,
      name_region: regionRecord.name_region
    });
  }

  async findByName(name: string): Promise<Region | null> {
    const regionRecord = await prisma.region.findFirst({
      where: { name_region: name }
    });

    if (!regionRecord) return null;

    return Region.create({
      id: regionRecord.id,
      name_region: regionRecord.name_region
    });
  }

  async findAll(): Promise<Region[]> {
    const regionRecords = await prisma.region.findMany();

    return regionRecords.map((record) => 
      Region.create({
        id: record.id,
        name_region: record.name_region
      })
    );
  }

  async save(region: Region): Promise<Region> {
    const data = region.toJSON();

    const savedRecord = await prisma.region.create({
      data: {
        id: data.id,
        name_region: data.name_region
      }
    });

    return Region.create({
      id: savedRecord.id,
      name_region: savedRecord.name_region
    });
  }

  async update(region: Region): Promise<Region> {
    const data = region.toJSON();

    const updatedRecord = await prisma.region.update({
      where: { id: data.id },
      data: {
        name_region: data.name_region
      }
    });

    return Region.create({
      id: updatedRecord.id,
      name_region: updatedRecord.name_region
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.region.delete({
      where: { id }
    });
  }
}
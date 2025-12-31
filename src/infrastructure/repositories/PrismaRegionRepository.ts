import { Region } from "../../domain/entities/Region";
import { RegionRepository } from "../../domain/repositories/RegionRepository";
import prisma from "../database/prisma/client";

export class PrismaRegionRepository implements RegionRepository {
  async findById(id: string): Promise<Region | null> {
    const regionRecord = await prisma.region.findUnique({
      where: { id },
      include: { status: true }
    });

    if (!regionRecord) return null;

    return Region.create({
      id: regionRecord.id,
      name_region: regionRecord.name_region,
      status_id: regionRecord.status_id ?? undefined
    });
  }

  async findByName(name: string): Promise<Region | null> {
    const regionRecord = await prisma.region.findFirst({
      where: { name_region: name },
      include: { status: true }
    });

    if (!regionRecord) return null;

    return Region.create({
      id: regionRecord.id,
      name_region: regionRecord.name_region,
      status_id: regionRecord.status_id ?? undefined
    });
  }

  async findAll(): Promise<Region[]> {
    const regionRecords = await prisma.region.findMany({
      where: {
        status: {
          name: { not: 'Eliminado' }
        }
      },
      include: { status: true }
    });

    return regionRecords.map((record) => 
      Region.create({
        id: record.id,
        name_region: record.name_region,
        status_id: record.status_id ?? undefined
      })
    );
  }

  async save(region: Region): Promise<Region> {
    const data = region.toJSON();

    // Obtener status_id o usar "Activo" por defecto
    let statusId = data.status_id;
    if (!statusId) {
      const activeStatus = await prisma.status.findUnique({ where: { name: 'Activo' } });
      statusId = activeStatus?.id;
    }

    const savedRecord = await prisma.region.create({
      data: {
        id: data.id,
        name_region: data.name_region,
        status_id: statusId
      },
      include: { status: true }
    });

    return Region.create({
      id: savedRecord.id,
      name_region: savedRecord.name_region,
      status_id: savedRecord.status_id ?? undefined
    });
  }

  async update(region: Region): Promise<Region> {
    const data = region.toJSON();

    const updatedRecord = await prisma.region.update({
      where: { id: data.id },
      data: {
        name_region: data.name_region,
        status_id: data.status_id
      },
      include: { status: true }
    });

    return Region.create({
      id: updatedRecord.id,
      name_region: updatedRecord.name_region,
      status_id: updatedRecord.status_id ?? undefined
    });
  }

  async softDelete(id: string): Promise<void> {
    const deletedStatus = await prisma.status.findUnique({ where: { name: 'Eliminado' } });
    if (deletedStatus) {
      await prisma.region.update({
        where: { id },
        data: { status_id: deletedStatus.id }
      });
    }
  }

  async delete(id: string): Promise<void> {
    await prisma.region.delete({
      where: { id }
    });
  }
}
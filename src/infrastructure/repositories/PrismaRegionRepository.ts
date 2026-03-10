import { Region } from "../../domain/entities/Region";
import { RegionRepository } from "../../domain/repositories/RegionRepository";
import { Prisma } from "@prisma/client";
import prisma from "../database/prisma/client";

export class PrismaRegionRepository implements RegionRepository {
  private mapToEntity(record: {
    id: string;
    name_region: string;
    status_id: string | null;
    id_coordinator: string | null;
    coordinator?: { id: string } | null;
    coordinators: Array<{ id: string }>;
  }): Region {
    const coordinatorId = record.id_coordinator ?? record.coordinator?.id ?? record.coordinators[0]?.id;

    return Region.create({
      id: record.id,
      name_region: record.name_region,
      status_id: record.status_id ?? undefined,
      id_coordinator: coordinatorId ?? undefined
    });
  }

  private async assignCoordinatorToRegion(
    tx: Prisma.TransactionClient,
    regionId: string,
    coordinatorId?: string
  ): Promise<void> {
    if (!coordinatorId) return;

    const coordinator = await tx.coordinator.findUnique({
      where: { id: coordinatorId }
    });

    if (!coordinator) {
      throw new Error(`Coordinator with ID ${coordinatorId} not found`);
    }

    if (coordinator.id_region === regionId) {
      return;
    }

    const regionAlreadyHasCoordinator = await tx.coordinator.findFirst({
      where: {
        id_region: regionId,
        id: { not: coordinatorId }
      }
    });

    if (regionAlreadyHasCoordinator) {
      throw new Error(`Region with ID ${regionId} already has a different coordinator`);
    }

    await tx.coordinator.update({
      where: { id: coordinatorId },
      data: { id_region: regionId }
    });
  }

  async findById(id: string): Promise<Region | null> {
    const regionRecord = await prisma.region.findUnique({
      where: { id },
      include: { status: true, coordinator: true, coordinators: true }
    });

    if (!regionRecord) return null;

    return this.mapToEntity(regionRecord);
  }

  async findByName(name: string): Promise<Region | null> {
    const regionRecord = await prisma.region.findFirst({
      where: { name_region: name },
      include: { status: true, coordinator: true, coordinators: true }
    });

    if (!regionRecord) return null;

    return this.mapToEntity(regionRecord);
  }

  async findAll(): Promise<Region[]> {
    const regionRecords = await prisma.region.findMany({
      where: {
        status: {
          name: { not: 'Eliminado' }
        }
      },
      include: { status: true, coordinator: true, coordinators: true }
    });

    return regionRecords.map((record) => this.mapToEntity(record));
  }

  async save(region: Region): Promise<Region> {
    const data = region.toJSON();

    // Obtener status_id o usar "Activo" por defecto
    let statusId = data.status_id;
    if (!statusId) {
      const activeStatus = await prisma.status.findUnique({ where: { name: 'Activo' } });
      statusId = activeStatus?.id;
    }

    const savedRecord = await prisma.$transaction(async (tx) => {
      const created = await tx.region.create({
        data: {
          id: data.id,
          name_region: data.name_region,
          status_id: statusId
        }
      });

      await this.assignCoordinatorToRegion(tx, created.id, data.id_coordinator);

      return tx.region.findUnique({
        where: { id: created.id },
        include: { status: true, coordinator: true, coordinators: true }
      });
    });

    if (!savedRecord) {
      throw new Error('Failed to create region');
    }

    return this.mapToEntity(savedRecord);
  }

  async update(region: Region): Promise<Region> {
    const data = region.toJSON();

    const updatedRecord = await prisma.$transaction(async (tx) => {
      await tx.region.update({
        where: { id: data.id },
        data: {
          name_region: data.name_region,
          status_id: data.status_id
        }
      });

      await this.assignCoordinatorToRegion(tx, data.id, data.id_coordinator);

      return tx.region.findUnique({
        where: { id: data.id },
        include: { status: true, coordinator: true, coordinators: true }
      });
    });

    if (!updatedRecord) {
      throw new Error('Failed to update region');
    }

    return this.mapToEntity(updatedRecord);
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
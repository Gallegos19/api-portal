import { Coordinator } from "../../domain/entities/Coordinator";
import { CoordinatorRepository } from "../../domain/repositories/CoordinatorRepository";
import prisma from "../database/prisma/client";

export class PrismaCoordinatorRepository implements CoordinatorRepository {
  async findById(id: string): Promise<Coordinator | null> {
    const coordinatorRecord = await prisma.coordinator.findUnique({
      where: { id },
      include: { status: true }
    });

    if (!coordinatorRecord) return null;

    return Coordinator.create({
      id: coordinatorRecord.id,
      id_user: coordinatorRecord.id_user,
      id_region: coordinatorRecord.id_region,
      status_id: coordinatorRecord.status_id ?? undefined
    });
  }

  async findByUserId(userId: string): Promise<Coordinator | null> {
    const coordinatorRecord = await prisma.coordinator.findUnique({
      where: { id_user: userId },
      include: { status: true }
    });

    if (!coordinatorRecord) return null;

    return Coordinator.create({
      id: coordinatorRecord.id,
      id_user: coordinatorRecord.id_user,
      id_region: coordinatorRecord.id_region,
      status_id: coordinatorRecord.status_id ?? undefined
    });
  }

  async findAll(): Promise<Coordinator[]> {
    const coordinatorRecords = await prisma.coordinator.findMany({
      where: {
        status: {
          name: { not: 'Eliminado' }
        }
      },
      include: { status: true }
    });

    return coordinatorRecords.map((record) => 
      Coordinator.create({
        id: record.id,
        id_user: record.id_user,
        id_region: record.id_region,
        status_id: record.status_id ?? undefined
      })
    );
  }

  async save(coordinator: Coordinator): Promise<Coordinator> {
    const data = coordinator.toJSON();

    // Obtener status_id o usar "Activo" por defecto
    let statusId = data.status_id;
    if (!statusId) {
      const activeStatus = await prisma.status.findUnique({ where: { name: 'Activo' } });
      statusId = activeStatus?.id;
    }

    const savedRecord = await prisma.coordinator.create({
      data: {
        id: data.id,
        id_user: data.id_user,
        id_region: data.id_region,
        status_id: statusId
      },
      include: { status: true }
    });

    return Coordinator.create({
      id: savedRecord.id,
      id_user: savedRecord.id_user,
      id_region: savedRecord.id_region,
      status_id: savedRecord.status_id ?? undefined
    });
  }

  async update(coordinator: Coordinator): Promise<Coordinator> {
    const data = coordinator.toJSON();

    const updatedRecord = await prisma.coordinator.update({
      where: { id: data.id },
      data: {
        id_user: data.id_user,
        id_region: data.id_region,
        status_id: data.status_id
      },
      include: { status: true }
    });

    return Coordinator.create({
      id: updatedRecord.id,
      id_user: updatedRecord.id_user,
      id_region: updatedRecord.id_region,
      status_id: updatedRecord.status_id ?? undefined
    });
  }

  async softDelete(id: string): Promise<void> {
    const deletedStatus = await prisma.status.findUnique({ where: { name: 'Eliminado' } });
    if (deletedStatus) {
      await prisma.coordinator.update({
        where: { id },
        data: { status_id: deletedStatus.id }
      });
    }
  }

  async delete(id: string): Promise<void> {
    await prisma.coordinator.delete({
      where: { id }
    });
  }
}
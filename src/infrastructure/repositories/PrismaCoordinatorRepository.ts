import { Coordinator } from "../../domain/entities/Coordinator";
import { CoordinatorRepository } from "../../domain/repositories/CoordinatorRepository";
import prisma from "../database/prisma/client";

export class PrismaCoordinatorRepository implements CoordinatorRepository {
  async findById(id: string): Promise<Coordinator | null> {
    const coordinatorRecord = await prisma.coordinator.findUnique({
      where: { id }
    });

    if (!coordinatorRecord) return null;

    return Coordinator.create({
      id: coordinatorRecord.id,
      id_user: coordinatorRecord.id_user,
      id_region: coordinatorRecord.id_region
    });
  }

  async findByUserId(userId: string): Promise<Coordinator | null> {
    const coordinatorRecord = await prisma.coordinator.findUnique({
      where: { id_user: userId }
    });

    if (!coordinatorRecord) return null;

    return Coordinator.create({
      id: coordinatorRecord.id,
      id_user: coordinatorRecord.id_user,
      id_region: coordinatorRecord.id_region
    });
  }

  async findAll(): Promise<Coordinator[]> {
    const coordinatorRecords = await prisma.coordinator.findMany();

    return coordinatorRecords.map((record) => 
      Coordinator.create({
        id: record.id,
        id_user: record.id_user,
        id_region: record.id_region
      })
    );
  }

  async save(coordinator: Coordinator): Promise<Coordinator> {
    const data = coordinator.toJSON();

    const savedRecord = await prisma.coordinator.create({
      data: {
        id: data.id,
        id_user: data.id_user,
        id_region: data.id_region
      }
    });

    return Coordinator.create({
      id: savedRecord.id,
      id_user: savedRecord.id_user,
      id_region: savedRecord.id_region
    });
  }

  async update(coordinator: Coordinator): Promise<Coordinator> {
    // Nothing to update except for id_user, which is a relation and shouldn't be changed
    return coordinator;
  }

  async delete(id: string): Promise<void> {
    await prisma.coordinator.delete({
      where: { id }
    });
  }
}
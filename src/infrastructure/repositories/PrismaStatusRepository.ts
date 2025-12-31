import { Status } from "../../domain/entities/Status";
import { StatusRepository } from "../../domain/repositories/StatusRepository";
import prisma from "../database/prisma/client";

export class PrismaStatusRepository implements StatusRepository {
  async findById(id: string): Promise<Status | null> {
    const statusRecord = await prisma.status.findUnique({
      where: { id }
    });

    if (!statusRecord) return null;

    return Status.create({
      id: statusRecord.id,
      name: statusRecord.name,
      created_at: statusRecord.created_at
    });
  }

  async findByName(name: string): Promise<Status | null> {
    const statusRecord = await prisma.status.findUnique({
      where: { name }
    });

    if (!statusRecord) return null;

    return Status.create({
      id: statusRecord.id,
      name: statusRecord.name,
      created_at: statusRecord.created_at
    });
  }

  async findAll(): Promise<Status[]> {
    const statusRecords = await prisma.status.findMany();

    return statusRecords.map((record) =>
      Status.create({
        id: record.id,
        name: record.name,
        created_at: record.created_at
      })
    );
  }

  async save(status: Status): Promise<Status> {
    const data = status.toJSON();

    const savedRecord = await prisma.status.create({
      data: {
        id: data.id,
        name: data.name,
        created_at: data.created_at
      }
    });

    return Status.create({
      id: savedRecord.id,
      name: savedRecord.name,
      created_at: savedRecord.created_at
    });
  }
}

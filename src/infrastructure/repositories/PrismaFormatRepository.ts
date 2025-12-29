import { Format } from "../../domain/entities/Format";
import { FormatRepository } from "../../domain/repositories/FormatRepository";
import prisma from "../database/prisma/client";

export class PrismaFormatRepository implements FormatRepository {
  async findById(id: string): Promise<Format | null> {
    const formatRecord = await prisma.format.findUnique({
      where: { id }
    });

    if (!formatRecord) return null;

    return Format.create({
      id: formatRecord.id,
      title: formatRecord.title,
      description: formatRecord.description || undefined,
      id_archive: formatRecord.id_archive || undefined,
      created_at: formatRecord.created_at,
      created_by: formatRecord.created_by
    });
  }

  async findByCreatorId(creatorId: string): Promise<Format[]> {
    const formatRecords = await prisma.format.findMany({
      where: { created_by: creatorId }
    });

    return formatRecords.map((record) => 
      Format.create({
        id: record.id,
        title: record.title,
        description: record.description || undefined,
        id_archive: record.id_archive || undefined,
        created_at: record.created_at,
        created_by: record.created_by
      })
    );
  }

  async findAll(): Promise<Format[]> {
    const formatRecords = await prisma.format.findMany();

    return formatRecords.map((record) => 
      Format.create({
        id: record.id,
        title: record.title,
        description: record.description || undefined,
        id_archive: record.id_archive || undefined,
        created_at: record.created_at,
        created_by: record.created_by
      })
    );
  }

  async save(format: Format): Promise<Format> {
    const data = format.toJSON();

    const savedRecord = await prisma.format.create({
      data: {
        id: data.id,
        title: data.title,
        description: data.description,
        id_archive: data.id_archive,
        created_at: data.created_at,
        created_by: data.created_by
      }
    });

    return Format.create({
      id: savedRecord.id,
      title: savedRecord.title,
      description: savedRecord.description || undefined,
      id_archive: savedRecord.id_archive || undefined,
      created_at: savedRecord.created_at,
      created_by: savedRecord.created_by
    });
  }

  async update(format: Format): Promise<Format> {
    const data = format.toJSON();

    const updatedRecord = await prisma.format.update({
      where: { id: data.id },
      data: {
        title: data.title,
        description: data.description,
        id_archive: data.id_archive
      }
    });

    return Format.create({
      id: updatedRecord.id,
      title: updatedRecord.title,
      description: updatedRecord.description || undefined,
      id_archive: updatedRecord.id_archive || undefined,
      created_at: updatedRecord.created_at,
      created_by: updatedRecord.created_by
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.format.delete({
      where: { id }
    });
  }
}
import { Archive } from "../../domain/entities/Archive";
import { ArchiveRepository } from "../../domain/repositories/ArchiveRepository";
import prisma from "../database/prisma/client";

export class PrismaArchiveRepository implements ArchiveRepository {
  async findById(id: string): Promise<Archive | null> {
    const archiveRecord = await prisma.archive.findUnique({
      where: { id }
    });

    if (!archiveRecord) return null;

    return Archive.create({
      id: archiveRecord.id,
      file_name: archiveRecord.file_name,
      file_type: archiveRecord.file_type || undefined,
      mime_type: archiveRecord.mime_type || undefined,
      storage_url: archiveRecord.storage_url,
      uploaded_at: archiveRecord.uploaded_at,
      uploaded_by: archiveRecord.uploaded_by
    });
  }

  async findByUploaderUserId(uploaderUserId: string): Promise<Archive[]> {
    const archiveRecords = await prisma.archive.findMany({
      where: { uploaded_by: uploaderUserId }
    });

    return archiveRecords.map((record) => 
      Archive.create({
        id: record.id,
        file_name: record.file_name,
        file_type: record.file_type || undefined,
        mime_type: record.mime_type || undefined,
        storage_url: record.storage_url,
        uploaded_at: record.uploaded_at,
        uploaded_by: record.uploaded_by
      })
    );
  }

  async findByFileType(fileType: string): Promise<Archive[]> {
    const archiveRecords = await prisma.archive.findMany({
      where: { file_type: fileType }
    });

    return archiveRecords.map((record) => 
      Archive.create({
        id: record.id,
        file_name: record.file_name,
        file_type: record.file_type || undefined,
        mime_type: record.mime_type || undefined,
        storage_url: record.storage_url,
        uploaded_at: record.uploaded_at,
        uploaded_by: record.uploaded_by
      })
    );
  }

  async findAll(): Promise<Archive[]> {
    const archiveRecords = await prisma.archive.findMany();

    return archiveRecords.map((record) => 
      Archive.create({
        id: record.id,
        file_name: record.file_name,
        file_type: record.file_type || undefined,
        mime_type: record.mime_type || undefined,
        storage_url: record.storage_url,
        uploaded_at: record.uploaded_at,
        uploaded_by: record.uploaded_by
      })
    );
  }

  async save(archive: Archive): Promise<Archive> {
    const data = archive.toJSON();

    const savedRecord = await prisma.archive.create({
      data: {
        id: data.id,
        file_name: data.file_name,
        file_type: data.file_type,
        mime_type: data.mime_type,
        storage_url: data.storage_url,
        uploaded_at: data.uploaded_at,
        uploaded_by: data.uploaded_by
      }
    });

    return Archive.create({
      id: savedRecord.id,
      file_name: savedRecord.file_name,
      file_type: savedRecord.file_type || undefined,
      mime_type: savedRecord.mime_type || undefined,
      storage_url: savedRecord.storage_url,
      uploaded_at: savedRecord.uploaded_at,
      uploaded_by: savedRecord.uploaded_by
    });
  }

  async update(archive: Archive): Promise<Archive> {
    const data = archive.toJSON();

    const updatedRecord = await prisma.archive.update({
      where: { id: data.id },
      data: {
        file_name: data.file_name,
        file_type: data.file_type,
        mime_type: data.mime_type,
        storage_url: data.storage_url
      }
    });

    return Archive.create({
      id: updatedRecord.id,
      file_name: updatedRecord.file_name,
      file_type: updatedRecord.file_type || undefined,
      mime_type: updatedRecord.mime_type || undefined,
      storage_url: updatedRecord.storage_url,
      uploaded_at: updatedRecord.uploaded_at,
      uploaded_by: updatedRecord.uploaded_by
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.archive.delete({
      where: { id }
    });
  }
}
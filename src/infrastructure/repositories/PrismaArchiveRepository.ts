import { Archive } from "../../domain/entities/Archive";
import { ArchiveRepository } from "../../domain/repositories/ArchiveRepository";
import prisma from "../database/prisma/client";

export class PrismaArchiveRepository implements ArchiveRepository {
  async findById(id: string): Promise<Archive | null> {
    const archiveRecord = await prisma.archive.findUnique({
      where: { id },
      include: { 
        status: true,
        school_year: true
      }
    });

    if (!archiveRecord) return null;

    return Archive.create({
      id: archiveRecord.id,
      file_name: archiveRecord.file_name,
      file_type: archiveRecord.file_type || undefined,
      mime_type: archiveRecord.mime_type || undefined,
      storage_url: archiveRecord.storage_url,
      uploaded_at: archiveRecord.uploaded_at,
      uploaded_by: archiveRecord.uploaded_by,
      status_id: archiveRecord.status_id || undefined,
      school_year_id: archiveRecord.school_year_id || undefined
    });
  }

  async findByUploaderUserId(uploaderUserId: string): Promise<Archive[]> {
    const archiveRecords = await prisma.archive.findMany({
      where: { 
        uploaded_by: uploaderUserId,
        status: { name: { not: 'Eliminado' } }
      },
      include: { 
        status: true,
        school_year: true
      }
    });

    return archiveRecords.map((record) => 
      Archive.create({
        id: record.id,
        file_name: record.file_name,
        file_type: record.file_type || undefined,
        mime_type: record.mime_type || undefined,
        storage_url: record.storage_url,
        uploaded_at: record.uploaded_at,
        uploaded_by: record.uploaded_by,
        status_id: record.status_id || undefined,
        school_year_id: record.school_year_id || undefined
      })
    );
  }

  async findByFileType(fileType: string): Promise<Archive[]> {
    const archiveRecords = await prisma.archive.findMany({
      where: { 
        file_type: fileType,
        status: { name: { not: 'Eliminado' } }
      },
      include: { 
        status: true,
        school_year: true
      }
    });

    return archiveRecords.map((record) => 
      Archive.create({
        id: record.id,
        file_name: record.file_name,
        file_type: record.file_type || undefined,
        mime_type: record.mime_type || undefined,
        storage_url: record.storage_url,
        uploaded_at: record.uploaded_at,
        uploaded_by: record.uploaded_by,
        status_id: record.status_id || undefined,
        school_year_id: record.school_year_id || undefined
      })
    );
  }

  async findAll(): Promise<Archive[]> {
    const archiveRecords = await prisma.archive.findMany({
      where: {
        status: { name: { not: 'Eliminado' } }
      },
      include: { 
        status: true,
        school_year: true
      }
    });

    return archiveRecords.map((record) => 
      Archive.create({
        id: record.id,
        file_name: record.file_name,
        file_type: record.file_type || undefined,
        mime_type: record.mime_type || undefined,
        storage_url: record.storage_url,
        uploaded_at: record.uploaded_at,
        uploaded_by: record.uploaded_by,
        status_id: record.status_id || undefined,
        school_year_id: record.school_year_id || undefined
      })
    );
  }

  async save(archive: Archive): Promise<Archive> {
    const data = archive.toJSON();

    let statusId = data.status_id;
    if (!statusId) {
      const activeStatus = await prisma.status.findUnique({ where: { name: 'Activo' } });
      statusId = activeStatus?.id;
    }

    const savedRecord = await prisma.archive.create({
      data: {
        id: data.id,
        file_name: data.file_name,
        file_type: data.file_type,
        mime_type: data.mime_type,
        storage_url: data.storage_url,
        uploaded_at: data.uploaded_at,
        uploaded_by: data.uploaded_by,
        status_id: statusId,
        school_year_id: data.school_year_id
      },
      include: { 
        status: true,
        school_year: true
      }
    });

    return Archive.create({
      id: savedRecord.id,
      file_name: savedRecord.file_name,
      file_type: savedRecord.file_type || undefined,
      mime_type: savedRecord.mime_type || undefined,
      storage_url: savedRecord.storage_url,
      uploaded_at: savedRecord.uploaded_at,
      uploaded_by: savedRecord.uploaded_by,
      status_id: savedRecord.status_id || undefined,
      school_year_id: savedRecord.school_year_id || undefined
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
        storage_url: data.storage_url,
        status_id: data.status_id,
        school_year_id: data.school_year_id
      },
      include: { 
        status: true,
        school_year: true
      }
    });

    return Archive.create({
      id: updatedRecord.id,
      file_name: updatedRecord.file_name,
      file_type: updatedRecord.file_type || undefined,
      mime_type: updatedRecord.mime_type || undefined,
      storage_url: updatedRecord.storage_url,
      uploaded_at: updatedRecord.uploaded_at,
      uploaded_by: updatedRecord.uploaded_by,
      status_id: updatedRecord.status_id || undefined,
      school_year_id: updatedRecord.school_year_id || undefined
    });
  }

  async softDelete(id: string): Promise<void> {
    const deletedStatus = await prisma.status.findUnique({ where: { name: 'Eliminado' } });
    if (deletedStatus) {
      await prisma.archive.update({
        where: { id },
        data: { status_id: deletedStatus.id }
      });
    }
  }

  async delete(id: string): Promise<void> {
    await prisma.archive.delete({
      where: { id }
    });
  }
}
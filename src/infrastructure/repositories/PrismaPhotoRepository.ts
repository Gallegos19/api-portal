import { Photo } from "../../domain/entities/Photo";
import { PhotoRepository } from "../../domain/repositories/PhotoRepository";
import prisma from "../database/prisma/client";

export class PrismaPhotoRepository implements PhotoRepository {
  async findById(id: string): Promise<Photo | null> {
    const photoRecord = await prisma.photo.findUnique({
      where: { id },
      include: { 
        status: true,
        school_year: true
      }
    });

    if (!photoRecord) return null;

    return Photo.create({
      id: photoRecord.id,
      title: photoRecord.title,
      description: photoRecord.description || undefined,
      id_archive: photoRecord.id_archive || undefined,
      created_at: photoRecord.created_at,
      created_by: photoRecord.created_by,
      status_id: photoRecord.status_id || undefined,
      school_year_id: photoRecord.school_year_id || undefined
    });
  }

  async findByCreatorId(creatorId: string): Promise<Photo[]> {
    const photoRecords = await prisma.photo.findMany({
      where: { 
        created_by: creatorId,
        status: { name: { not: 'Eliminado' } }
      },
      include: { 
        status: true,
        school_year: true
      }
    });

    return photoRecords.map((record: any) => 
      Photo.create({
        id: record.id,
        title: record.title,
        description: record.description || undefined,
        id_archive: record.id_archive || undefined,
        created_at: record.created_at,
        created_by: record.created_by,
        status_id: record.status_id || undefined,
        school_year_id: record.school_year_id || undefined
      })
    );
  }

  async findAll(): Promise<Photo[]> {
    const photoRecords = await prisma.photo.findMany({
      where: {
        status: { name: { not: 'Eliminado' } }
      },
      include: { 
        status: true,
        school_year: true
      }
    });

    return photoRecords.map((record) => 
      Photo.create({
        id: record.id,
        title: record.title,
        description: record.description || undefined,
        id_archive: record.id_archive || undefined,
        created_at: record.created_at,
        created_by: record.created_by,
        status_id: record.status_id || undefined,
        school_year_id: record.school_year_id || undefined
      })
    );
  }

  async save(photo: Photo): Promise<Photo> {
    const data = photo.toJSON();

    let statusId = data.status_id;
    if (!statusId) {
      const activeStatus = await prisma.status.findUnique({ where: { name: 'Activo' } });
      statusId = activeStatus?.id;
    }

    const savedRecord = await prisma.photo.create({
      data: {
        id: data.id,
        title: data.title,
        description: data.description,
        id_archive: data.id_archive,
        created_at: data.created_at,
        created_by: data.created_by,
        status_id: statusId,
        school_year_id: data.school_year_id
      },
      include: { 
        status: true,
        school_year: true
      }
    });

    return Photo.create({
      id: savedRecord.id,
      title: savedRecord.title,
      description: savedRecord.description || undefined,
      id_archive: savedRecord.id_archive || undefined,
      created_at: savedRecord.created_at,
      created_by: savedRecord.created_by,
      status_id: savedRecord.status_id || undefined,
      school_year_id: savedRecord.school_year_id || undefined
    });
  }

  async update(photo: Photo): Promise<Photo> {
    const data = photo.toJSON();

    const updatedRecord = await prisma.photo.update({
      where: { id: data.id },
      data: {
        title: data.title,
        description: data.description,
        id_archive: data.id_archive,
        status_id: data.status_id,
        school_year_id: data.school_year_id
      },
      include: { 
        status: true,
        school_year: true
      }
    });

    return Photo.create({
      id: updatedRecord.id,
      title: updatedRecord.title,
      description: updatedRecord.description || undefined,
      id_archive: updatedRecord.id_archive || undefined,
      created_at: updatedRecord.created_at,
      created_by: updatedRecord.created_by,
      status_id: updatedRecord.status_id || undefined,
      school_year_id: updatedRecord.school_year_id || undefined
    });
  }

  async softDelete(id: string): Promise<void> {
    const deletedStatus = await prisma.status.findUnique({ where: { name: 'Eliminado' } });
    if (deletedStatus) {
      await prisma.photo.update({
        where: { id },
        data: { status_id: deletedStatus.id }
      });
    }
  }

  async delete(id: string): Promise<void> {
    await prisma.photo.delete({
      where: { id }
    });
  }
}
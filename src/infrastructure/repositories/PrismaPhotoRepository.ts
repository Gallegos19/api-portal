import { Photo } from "../../domain/entities/Photo";
import { PhotoRepository } from "../../domain/repositories/PhotoRepository";
import prisma from "../database/prisma/client";

export class PrismaPhotoRepository implements PhotoRepository {
  async findById(id: string): Promise<Photo | null> {
    const photoRecord = await prisma.photo.findUnique({
      where: { id }
    });

    if (!photoRecord) return null;

    return Photo.create({
      id: photoRecord.id,
      title: photoRecord.title,
      description: photoRecord.description || undefined,
      id_archive: photoRecord.id_archive || undefined,
      created_at: photoRecord.created_at,
      created_by: photoRecord.created_by
    });
  }

  async findByCreatorId(creatorId: string): Promise<Photo[]> {
    const photoRecords = await prisma.photo.findMany({
      where: { created_by: creatorId }
    });

    return photoRecords.map((record: any) => 
      Photo.create({
        id: record.id,
        title: record.title,
        description: record.description || undefined,
        id_archive: record.id_archive || undefined,
        created_at: record.created_at,
        created_by: record.created_by
      })
    );
  }

  async findAll(): Promise<Photo[]> {
    const photoRecords = await prisma.photo.findMany();

    return photoRecords.map((record) => 
      Photo.create({
        id: record.id,
        title: record.title,
        description: record.description || undefined,
        id_archive: record.id_archive || undefined,
        created_at: record.created_at,
        created_by: record.created_by
      })
    );
  }

  async save(photo: Photo): Promise<Photo> {
    const data = photo.toJSON();

    const savedRecord = await prisma.photo.create({
      data: {
        id: data.id,
        title: data.title,
        description: data.description,
        id_archive: data.id_archive,
        created_at: data.created_at,
        created_by: data.created_by
      }
    });

    return Photo.create({
      id: savedRecord.id,
      title: savedRecord.title,
      description: savedRecord.description || undefined,
      id_archive: savedRecord.id_archive || undefined,
      created_at: savedRecord.created_at,
      created_by: savedRecord.created_by
    });
  }

  async update(photo: Photo): Promise<Photo> {
    const data = photo.toJSON();

    const updatedRecord = await prisma.photo.update({
      where: { id: data.id },
      data: {
        title: data.title,
        description: data.description,
        id_archive: data.id_archive
      }
    });

    return Photo.create({
      id: updatedRecord.id,
      title: updatedRecord.title,
      description: updatedRecord.description || undefined,
      id_archive: updatedRecord.id_archive || undefined,
      created_at: updatedRecord.created_at,
      created_by: updatedRecord.created_by
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.photo.delete({
      where: { id }
    });
  }
}
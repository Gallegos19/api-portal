import { EventPhoto } from "../../domain/entities/EventPhoto";
import { EventPhotoRepository } from "../../domain/repositories/EventPhotoRepository";
import prisma from "../database/prisma/client";

export class PrismaEventPhotoRepository implements EventPhotoRepository {
  async findById(id: string): Promise<EventPhoto | null> {
    const eventPhotoRecord = await prisma.eventPhoto.findUnique({
      where: { id }
    });

    if (!eventPhotoRecord) return null;

    return EventPhoto.create({
      id: eventPhotoRecord.id,
      id_event: eventPhotoRecord.id_event,
      id_photo: eventPhotoRecord.id_photo
    });
  }

  async findByEventId(eventId: string): Promise<EventPhoto[]> {
    const eventPhotoRecords = await prisma.eventPhoto.findMany({
      where: { id_event: eventId }
    });

    return eventPhotoRecords.map((record) => 
      EventPhoto.create({
        id: record.id,
        id_event: record.id_event,
        id_photo: record.id_photo
      })
    );
  }

  async findByPhotoId(photoId: string): Promise<EventPhoto[]> {
    const eventPhotoRecords = await prisma.eventPhoto.findMany({
      where: { id_photo: photoId }
    });

    return eventPhotoRecords.map((record) => 
      EventPhoto.create({
        id: record.id,
        id_event: record.id_event,
        id_photo: record.id_photo
      })
    );
  }

  async findAll(): Promise<EventPhoto[]> {
    const eventPhotoRecords = await prisma.eventPhoto.findMany();

    return eventPhotoRecords.map((record) => 
      EventPhoto.create({
        id: record.id,
        id_event: record.id_event,
        id_photo: record.id_photo
      })
    );
  }

  async save(eventPhoto: EventPhoto): Promise<EventPhoto> {
    const data = eventPhoto.toJSON();

    const savedRecord = await prisma.eventPhoto.create({
      data: {
        id: data.id,
        id_event: data.id_event,
        id_photo: data.id_photo
      }
    });

    return EventPhoto.create({
      id: savedRecord.id,
      id_event: savedRecord.id_event,
      id_photo: savedRecord.id_photo
    });
  }

  async update(eventPhoto: EventPhoto): Promise<EventPhoto> {
    const data = eventPhoto.toJSON();

    const updatedRecord = await prisma.eventPhoto.update({
      where: { id: data.id },
      data: {
        id_event: data.id_event,
        id_photo: data.id_photo
      }
    });

    return EventPhoto.create({
      id: updatedRecord.id,
      id_event: updatedRecord.id_event,
      id_photo: updatedRecord.id_photo
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.eventPhoto.delete({
      where: { id }
    });
  }
}
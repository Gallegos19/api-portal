import { Event } from "../../domain/entities/Event";
import { EventRepository } from "../../domain/repositories/EventRepository";
import prisma from "../database/prisma/client";

export class PrismaEventRepository implements EventRepository {
  async findById(id: string): Promise<Event | null> {
    const eventRecord = await prisma.event.findUnique({
      where: { id }
    });

    if (!eventRecord) return null;

    return Event.create({
      id: eventRecord.id,
      title: eventRecord.title,
      description: eventRecord.description || undefined,
      created_at: eventRecord.created_at,
      created_by: eventRecord.created_by
    });
  }

  async findByCreatorId(creatorId: string): Promise<Event[]> {
    const eventRecords = await prisma.event.findMany({
      where: { created_by: creatorId }
    });

    return eventRecords.map((record) => 
      Event.create({
        id: record.id,
        title: record.title,
        description: record.description || undefined,
        created_at: record.created_at,
        created_by: record.created_by
      })
    );
  }

  async findAll(): Promise<Event[]> {
    const eventRecords = await prisma.event.findMany();

    return eventRecords.map((record) => 
      Event.create({
        id: record.id,
        title: record.title,
        description: record.description || undefined,
        created_at: record.created_at,
        created_by: record.created_by
      })
    );
  }

  async save(event: Event): Promise<Event> {
    const data = event.toJSON();

    const savedRecord = await prisma.event.create({
      data: {
        id: data.id,
        title: data.title,
        description: data.description,
        created_at: data.created_at,
        created_by: data.created_by
      }
    });

    return Event.create({
      id: savedRecord.id,
      title: savedRecord.title,
      description: savedRecord.description || undefined,
      created_at: savedRecord.created_at,
      created_by: savedRecord.created_by
    });
  }

  async update(event: Event): Promise<Event> {
    const data = event.toJSON();

    const updatedRecord = await prisma.event.update({
      where: { id: data.id },
      data: {
        title: data.title,
        description: data.description
      }
    });

    return Event.create({
      id: updatedRecord.id,
      title: updatedRecord.title,
      description: updatedRecord.description || undefined,
      created_at: updatedRecord.created_at,
      created_by: updatedRecord.created_by
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.event.delete({
      where: { id }
    });
  }
}
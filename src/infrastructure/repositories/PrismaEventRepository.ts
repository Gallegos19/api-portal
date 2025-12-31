import { Event } from "../../domain/entities/Event";
import { EventRepository } from "../../domain/repositories/EventRepository";
import prisma from "../database/prisma/client";

export class PrismaEventRepository implements EventRepository {
  async findById(id: string): Promise<Event | null> {
    const eventRecord = await prisma.event.findUnique({
      where: { id },
      include: { 
        status: true,
        school_year: true
      }
    });

    if (!eventRecord) return null;

    return Event.create({
      id: eventRecord.id,
      title: eventRecord.title,
      description: eventRecord.description || undefined,
      created_at: eventRecord.created_at,
      created_by: eventRecord.created_by,
      status_id: eventRecord.status_id || undefined,
      school_year_id: eventRecord.school_year_id || undefined
    });
  }

  async findByCreatorId(creatorId: string): Promise<Event[]> {
    const eventRecords = await prisma.event.findMany({
      where: { 
        created_by: creatorId,
        status: { name: { not: 'Eliminado' } }
      },
      include: { 
        status: true,
        school_year: true
      }
    });

    return eventRecords.map((record) => 
      Event.create({
        id: record.id,
        title: record.title,
        description: record.description || undefined,
        created_at: record.created_at,
        created_by: record.created_by,
        status_id: record.status_id || undefined,
        school_year_id: record.school_year_id || undefined
      })
    );
  }

  async findAll(): Promise<Event[]> {
    const eventRecords = await prisma.event.findMany({
      where: {
        status: { name: { not: 'Eliminado' } }
      },
      include: { 
        status: true,
        school_year: true
      }
    });

    return eventRecords.map((record) => 
      Event.create({
        id: record.id,
        title: record.title,
        description: record.description || undefined,
        created_at: record.created_at,
        created_by: record.created_by,
        status_id: record.status_id || undefined,
        school_year_id: record.school_year_id || undefined
      })
    );
  }

  async save(event: Event): Promise<Event> {
    const data = event.toJSON();

    let statusId = data.status_id;
    if (!statusId) {
      const activeStatus = await prisma.status.findUnique({ where: { name: 'Activo' } });
      statusId = activeStatus?.id;
    }

    const savedRecord = await prisma.event.create({
      data: {
        id: data.id,
        title: data.title,
        description: data.description,
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

    return Event.create({
      id: savedRecord.id,
      title: savedRecord.title,
      description: savedRecord.description || undefined,
      created_at: savedRecord.created_at,
      created_by: savedRecord.created_by,
      status_id: savedRecord.status_id || undefined,
      school_year_id: savedRecord.school_year_id || undefined
    });
  }

  async update(event: Event): Promise<Event> {
    const data = event.toJSON();

    const updatedRecord = await prisma.event.update({
      where: { id: data.id },
      data: {
        title: data.title,
        description: data.description,
        status_id: data.status_id,
        school_year_id: data.school_year_id
      },
      include: { 
        status: true,
        school_year: true
      }
    });

    return Event.create({
      id: updatedRecord.id,
      title: updatedRecord.title,
      description: updatedRecord.description || undefined,
      created_at: updatedRecord.created_at,
      created_by: updatedRecord.created_by,
      status_id: updatedRecord.status_id || undefined,
      school_year_id: updatedRecord.school_year_id || undefined
    });
  }

  async softDelete(id: string): Promise<void> {
    const deletedStatus = await prisma.status.findUnique({ where: { name: 'Eliminado' } });
    if (deletedStatus) {
      await prisma.event.update({
        where: { id },
        data: { status_id: deletedStatus.id }
      });
    }
  }

  async delete(id: string): Promise<void> {
    await prisma.event.delete({
      where: { id }
    });
  }
}
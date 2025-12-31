import { Report } from "../../domain/entities/Report";
import { ReportRepository } from "../../domain/repositories/ReportRepository";
import prisma from "../database/prisma/client";

export class PrismaReportRepository implements ReportRepository {
  async findById(id: string): Promise<Report | null> {
    const reportRecord = await prisma.report.findUnique({
      where: { id },
      include: { 
        status: true,
        school_year: true
      }
    });

    if (!reportRecord) return null;

    return Report.create({
      id: reportRecord.id,
      title: reportRecord.title,
      description: reportRecord.description || undefined,
      type: reportRecord.type || undefined,
      id_archive: reportRecord.id_archive || undefined,
      created_at: reportRecord.created_at,
      created_by: reportRecord.created_by,
      status_id: reportRecord.status_id || undefined,
      school_year_id: reportRecord.school_year_id || undefined
    });
  }

  async findByCreatorId(creatorId: string): Promise<Report[]> {
    const reportRecords = await prisma.report.findMany({
      where: { 
        created_by: creatorId,
        status: { name: { not: 'Eliminado' } }
      },
      include: { 
        status: true,
        school_year: true
      }
    });

    return reportRecords.map((record) => 
      Report.create({
        id: record.id,
        title: record.title,
        description: record.description || undefined,
        type: record.type || undefined,
        id_archive: record.id_archive || undefined,
        created_at: record.created_at,
        created_by: record.created_by,
        status_id: record.status_id || undefined,
        school_year_id: record.school_year_id || undefined
      })
    );
  }

  async findByType(type: string): Promise<Report[]> {
    const reportRecords = await prisma.report.findMany({
      where: { 
        type,
        status: { name: { not: 'Eliminado' } }
      },
      include: { 
        status: true,
        school_year: true
      }
    });

    return reportRecords.map((record) => 
      Report.create({
        id: record.id,
        title: record.title,
        description: record.description || undefined,
        type: record.type || undefined,
        id_archive: record.id_archive || undefined,
        created_at: record.created_at,
        created_by: record.created_by,
        status_id: record.status_id || undefined,
        school_year_id: record.school_year_id || undefined
      })
    );
  }

  async findAll(): Promise<Report[]> {
    const reportRecords = await prisma.report.findMany({
      where: {
        status: { name: { not: 'Eliminado' } }
      },
      include: { 
        status: true,
        school_year: true
      }
    });

    return reportRecords.map((record) => 
      Report.create({
        id: record.id,
        title: record.title,
        description: record.description || undefined,
        type: record.type || undefined,
        id_archive: record.id_archive || undefined,
        created_at: record.created_at,
        created_by: record.created_by,
        status_id: record.status_id || undefined,
        school_year_id: record.school_year_id || undefined
      })
    );
  }

  async save(report: Report): Promise<Report> {
    const data = report.toJSON();

    let statusId = data.status_id;
    if (!statusId) {
      const activeStatus = await prisma.status.findUnique({ where: { name: 'Activo' } });
      statusId = activeStatus?.id;
    }

    const savedRecord = await prisma.report.create({
      data: {
        id: data.id,
        title: data.title,
        description: data.description,
        type: data.type,
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

    return Report.create({
      id: savedRecord.id,
      title: savedRecord.title,
      description: savedRecord.description || undefined,
      type: savedRecord.type || undefined,
      id_archive: savedRecord.id_archive || undefined,
      created_at: savedRecord.created_at,
      created_by: savedRecord.created_by,
      status_id: savedRecord.status_id || undefined,
      school_year_id: savedRecord.school_year_id || undefined
    });
  }

  async update(report: Report): Promise<Report> {
    const data = report.toJSON();

    const updatedRecord = await prisma.report.update({
      where: { id: data.id },
      data: {
        title: data.title,
        description: data.description,
        type: data.type,
        id_archive: data.id_archive,
        status_id: data.status_id,
        school_year_id: data.school_year_id
      },
      include: { 
        status: true,
        school_year: true
      }
    });

    return Report.create({
      id: updatedRecord.id,
      title: updatedRecord.title,
      description: updatedRecord.description || undefined,
      type: updatedRecord.type || undefined,
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
      await prisma.report.update({
        where: { id },
        data: { status_id: deletedStatus.id }
      });
    }
  }

  async delete(id: string): Promise<void> {
    await prisma.report.delete({
      where: { id }
    });
  }
}
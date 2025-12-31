import { SchoolYear } from "../../domain/entities/SchoolYear";
import { SchoolYearRepository } from "../../domain/repositories/SchoolYearRepository";
import prisma from "../database/prisma/client";

export class PrismaSchoolYearRepository implements SchoolYearRepository {
  async findById(id: string): Promise<SchoolYear | null> {
    const schoolYearRecord = await prisma.schoolYear.findUnique({
      where: { id }
    });

    if (!schoolYearRecord) return null;

    return SchoolYear.create({
      id: schoolYearRecord.id,
      name: schoolYearRecord.name,
      start_date: schoolYearRecord.start_date,
      end_date: schoolYearRecord.end_date,
      is_active: schoolYearRecord.is_active,
      created_at: schoolYearRecord.created_at
    });
  }

  async findByName(name: string): Promise<SchoolYear | null> {
    const schoolYearRecord = await prisma.schoolYear.findUnique({
      where: { name }
    });

    if (!schoolYearRecord) return null;

    return SchoolYear.create({
      id: schoolYearRecord.id,
      name: schoolYearRecord.name,
      start_date: schoolYearRecord.start_date,
      end_date: schoolYearRecord.end_date,
      is_active: schoolYearRecord.is_active,
      created_at: schoolYearRecord.created_at
    });
  }

  async findActive(): Promise<SchoolYear | null> {
    const schoolYearRecord = await prisma.schoolYear.findFirst({
      where: { is_active: true }
    });

    if (!schoolYearRecord) return null;

    return SchoolYear.create({
      id: schoolYearRecord.id,
      name: schoolYearRecord.name,
      start_date: schoolYearRecord.start_date,
      end_date: schoolYearRecord.end_date,
      is_active: schoolYearRecord.is_active,
      created_at: schoolYearRecord.created_at
    });
  }

  async findAll(): Promise<SchoolYear[]> {
    const schoolYearRecords = await prisma.schoolYear.findMany({
      orderBy: { start_date: 'desc' }
    });

    return schoolYearRecords.map((record) =>
      SchoolYear.create({
        id: record.id,
        name: record.name,
        start_date: record.start_date,
        end_date: record.end_date,
        is_active: record.is_active,
        created_at: record.created_at
      })
    );
  }

  async save(schoolYear: SchoolYear): Promise<SchoolYear> {
    const data = schoolYear.toJSON();

    const savedRecord = await prisma.schoolYear.create({
      data: {
        id: data.id,
        name: data.name,
        start_date: data.start_date,
        end_date: data.end_date,
        is_active: data.is_active,
        created_at: data.created_at
      }
    });

    return SchoolYear.create({
      id: savedRecord.id,
      name: savedRecord.name,
      start_date: savedRecord.start_date,
      end_date: savedRecord.end_date,
      is_active: savedRecord.is_active,
      created_at: savedRecord.created_at
    });
  }

  async update(schoolYear: SchoolYear): Promise<SchoolYear> {
    const data = schoolYear.toJSON();

    const updatedRecord = await prisma.schoolYear.update({
      where: { id: data.id },
      data: {
        name: data.name,
        start_date: data.start_date,
        end_date: data.end_date,
        is_active: data.is_active
      }
    });

    return SchoolYear.create({
      id: updatedRecord.id,
      name: updatedRecord.name,
      start_date: updatedRecord.start_date,
      end_date: updatedRecord.end_date,
      is_active: updatedRecord.is_active,
      created_at: updatedRecord.created_at
    });
  }
}

import { Intern } from "../../domain/entities/Intern";
import { InternRepository } from "../../domain/repositories/InternRepository";
import prisma from "../database/prisma/client";

export class PrismaInternRepository implements InternRepository {
  async findById(id: string): Promise<Intern | null> {
    const internRecord = await prisma.intern.findUnique({
      where: { id },
      include: { 
        status_record: true,
        school_year: true
      }
    });

    if (!internRecord) return null;

    return Intern.create({
      id: internRecord.id,
      chid: internRecord.chid,
      id_user: internRecord.id_user,
      status: internRecord.status,
      address: internRecord.address || undefined,
      education_level: internRecord.education_level || undefined,
      career_name: internRecord.career_name || undefined,
      grade: internRecord.grade || undefined,
      name_tutor: internRecord.name_tutor || undefined,
      service: internRecord.service || undefined,
      documentation: internRecord.documentation || undefined,
      id_subproject: internRecord.id_subproject || undefined,
      id_social_facilitator: internRecord.id_social_facilitator || undefined,
      start_date: internRecord.start_date || undefined,
      end_date: internRecord.end_date || undefined,
      status_id: internRecord.status_id || undefined,
      school_year_id: internRecord.school_year_id || undefined
    });
  }

  async findByUserId(userId: string): Promise<Intern | null> {
    const internRecord = await prisma.intern.findUnique({
      where: { id_user: userId },
      include: { 
        status_record: true,
        school_year: true
      }
    });

    if (!internRecord) return null;

    return Intern.create({
      id: internRecord.id,
      chid: internRecord.chid,
      id_user: internRecord.id_user,
      status: internRecord.status,
      address: internRecord.address || undefined,
      education_level: internRecord.education_level || undefined,
      career_name: internRecord.career_name || undefined,
      grade: internRecord.grade || undefined,
      name_tutor: internRecord.name_tutor || undefined,
      service: internRecord.service || undefined,
      documentation: internRecord.documentation || undefined,
      id_subproject: internRecord.id_subproject || undefined,
      id_social_facilitator: internRecord.id_social_facilitator || undefined,
      start_date: internRecord.start_date || undefined,
      end_date: internRecord.end_date || undefined,
      status_id: internRecord.status_id || undefined,
      school_year_id: internRecord.school_year_id || undefined
    });
  }

  async findBySocialFacilitatorId(socialFacilitatorId: string): Promise<Intern[]> {
    const internRecords = await prisma.intern.findMany({
      where: { 
        id_social_facilitator: socialFacilitatorId,
        status_record: { name: { not: 'Eliminado' } }
      },
      include: { 
        status_record: true,
        school_year: true
      }
    });

    return internRecords.map((internRecord) => 
      Intern.create({
        id: internRecord.id,
        chid: internRecord.chid,
        id_user: internRecord.id_user,
        status: internRecord.status,
        address: internRecord.address || undefined,
        education_level: internRecord.education_level || undefined,
        career_name: internRecord.career_name || undefined,
        grade: internRecord.grade || undefined,
        name_tutor: internRecord.name_tutor || undefined,
        service: internRecord.service || undefined,
        documentation: internRecord.documentation || undefined,
        id_subproject: internRecord.id_subproject || undefined,
        id_social_facilitator: internRecord.id_social_facilitator || undefined,
        start_date: internRecord.start_date || undefined,
        end_date: internRecord.end_date || undefined,
        status_id: internRecord.status_id || undefined,
        school_year_id: internRecord.school_year_id || undefined
      })
    );
  }

  async findBySubprojectId(subprojectId: string): Promise<Intern[]> {
    const internRecords = await prisma.intern.findMany({
      where: { 
        id_subproject: subprojectId,
        status_record: { name: { not: 'Eliminado' } }
      },
      include: { 
        status_record: true,
        school_year: true
      }
    });

    return internRecords.map((internRecord) => 
      Intern.create({
        id: internRecord.id,
        chid: internRecord.chid,
        id_user: internRecord.id_user,
        status: internRecord.status,
        address: internRecord.address || undefined,
        education_level: internRecord.education_level || undefined,
        career_name: internRecord.career_name || undefined,
        grade: internRecord.grade || undefined,
        name_tutor: internRecord.name_tutor || undefined,
        service: internRecord.service || undefined,
        documentation: internRecord.documentation || undefined,
        id_subproject: internRecord.id_subproject || undefined,
        id_social_facilitator: internRecord.id_social_facilitator || undefined,
        start_date: internRecord.start_date || undefined,
        end_date: internRecord.end_date || undefined,
        status_id: internRecord.status_id || undefined,
        school_year_id: internRecord.school_year_id || undefined
      })
    );
  }

  async findAll(): Promise<Intern[]> {
    const internRecords = await prisma.intern.findMany({
      where: {
        status_record: { name: { not: 'Eliminado' } }
      },
      include: {
        status_record: true,
        school_year: true
      }
    });

    return internRecords.map((internRecord) => 
      Intern.create({
        id: internRecord.id,
        chid: internRecord.chid,
        id_user: internRecord.id_user,
        status: internRecord.status,
        address: internRecord.address || undefined,
        education_level: internRecord.education_level || undefined,
        career_name: internRecord.career_name || undefined,
        grade: internRecord.grade || undefined,
        name_tutor: internRecord.name_tutor || undefined,
        service: internRecord.service || undefined,
        documentation: internRecord.documentation || undefined,
        id_subproject: internRecord.id_subproject || undefined,
        id_social_facilitator: internRecord.id_social_facilitator || undefined,
        start_date: internRecord.start_date || undefined,
        end_date: internRecord.end_date || undefined,
        status_id: internRecord.status_id || undefined,
        school_year_id: internRecord.school_year_id || undefined
      })
    );
  }

  async save(intern: Intern): Promise<Intern> {
    const internData = intern.toJSON();

    let statusId = internData.status_id;
    if (!statusId) {
      const activeStatus = await prisma.status.findUnique({ where: { name: 'Activo' } });
      statusId = activeStatus?.id;
    }

    const savedIntern = await prisma.intern.create({
      data: {
        id: internData.id,
        chid: internData.chid,
        id_user: internData.id_user,
        status: internData.status,
        address: internData.address,
        education_level: internData.education_level,
        career_name: internData.career_name,
        grade: internData.grade,
        name_tutor: internData.name_tutor,
        service: internData.service,
        documentation: internData.documentation,
        id_subproject: internData.id_subproject,
        id_social_facilitator: internData.id_social_facilitator,
        start_date: internData.start_date,
        end_date: internData.end_date,
        status_id: statusId,
        school_year_id: internData.school_year_id
      },
      include: { 
        status_record: true,
        school_year: true
      }
    });

    return Intern.create({
      id: savedIntern.id,
      chid: savedIntern.chid,
      id_user: savedIntern.id_user,
      status: savedIntern.status,
      address: savedIntern.address || undefined,
      education_level: savedIntern.education_level || undefined,
      career_name: savedIntern.career_name || undefined,
      grade: savedIntern.grade || undefined,
      name_tutor: savedIntern.name_tutor || undefined,
      service: savedIntern.service || undefined,
      documentation: savedIntern.documentation || undefined,
      id_subproject: savedIntern.id_subproject || undefined,
      id_social_facilitator: savedIntern.id_social_facilitator || undefined,
      start_date: savedIntern.start_date || undefined,
      end_date: savedIntern.end_date || undefined,
      status_id: savedIntern.status_id || undefined,
      school_year_id: savedIntern.school_year_id || undefined
    });
  }

  async update(intern: Intern): Promise<Intern> {
    const internData = intern.toJSON();

    const updatedIntern = await prisma.intern.update({
      where: { id: internData.id },
      data: {
        status: internData.status,
        address: internData.address,
        education_level: internData.education_level,
        career_name: internData.career_name,
        grade: internData.grade,
        name_tutor: internData.name_tutor,
        service: internData.service,
        documentation: internData.documentation,
        id_subproject: internData.id_subproject,
        id_social_facilitator: internData.id_social_facilitator,
        start_date: internData.start_date,
        end_date: internData.end_date,
        status_id: internData.status_id,
        school_year_id: internData.school_year_id
      },
      include: { 
        status_record: true,
        school_year: true
      }
    });

    return Intern.create({
      id: updatedIntern.id,
      chid: updatedIntern.chid,
      id_user: updatedIntern.id_user,
      status: updatedIntern.status,
      address: updatedIntern.address || undefined,
      education_level: updatedIntern.education_level || undefined,
      career_name: updatedIntern.career_name || undefined,
      grade: updatedIntern.grade || undefined,
      name_tutor: updatedIntern.name_tutor || undefined,
      service: updatedIntern.service || undefined,
      documentation: updatedIntern.documentation || undefined,
      id_subproject: updatedIntern.id_subproject || undefined,
      id_social_facilitator: updatedIntern.id_social_facilitator || undefined,
      start_date: updatedIntern.start_date || undefined,
      end_date: updatedIntern.end_date || undefined,
      status_id: updatedIntern.status_id || undefined,
      school_year_id: updatedIntern.school_year_id || undefined
    });
  }

  async softDelete(id: string): Promise<void> {
    const deletedStatus = await prisma.status.findUnique({ where: { name: 'Eliminado' } });
    if (deletedStatus) {
      await prisma.intern.update({
        where: { id },
        data: { status_id: deletedStatus.id }
      });
    }
  }

  async delete(id: string): Promise<void> {
    await prisma.intern.delete({
      where: { id }
    });
  }
}
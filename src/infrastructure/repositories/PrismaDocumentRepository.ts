import { Document } from "../../domain/entities/Document";
import { DocumentRepository } from "../../domain/repositories/DocumentRepository";
import prisma from "../database/prisma/client";

export class PrismaDocumentRepository implements DocumentRepository {
  async findById(id: string): Promise<Document | null> {
    const documentRecord = await prisma.document.findUnique({
      where: { id },
      include: { 
        status: true,
        school_year: true
      }
    });

    if (!documentRecord) return null;

    return Document.create({
      id: documentRecord.id,
      title: documentRecord.title,
      description: documentRecord.description || undefined,
      id_intern: documentRecord.id_intern || undefined,
      id_archive: documentRecord.id_archive || undefined,
      status_id: documentRecord.status_id || undefined,
      school_year_id: documentRecord.school_year_id || undefined,
      created_at: documentRecord.created_at
    });
  }

  async findAll(): Promise<Document[]> {
    const documentRecords = await prisma.document.findMany({
      where: {
        status: {
          name: { not: 'Eliminado' }
        }
      },
      include: { 
        status: true,
        school_year: true
      }
    });

    return documentRecords.map((documentRecord) => 
      Document.create({
        id: documentRecord.id,
        title: documentRecord.title,
        description: documentRecord.description || undefined,
        id_intern: documentRecord.id_intern || undefined,
        id_archive: documentRecord.id_archive || undefined,
        status_id: documentRecord.status_id || undefined,
        school_year_id: documentRecord.school_year_id || undefined,
        created_at: documentRecord.created_at
      })
    );
  }

  async findByInternId(internId: string): Promise<Document[]> {
    const documentRecords = await prisma.document.findMany({
      where: { id_intern: internId },
      include: { 
        status: true,
        school_year: true
      }
    });

    return documentRecords.map((documentRecord) => 
      Document.create({
        id: documentRecord.id,
        title: documentRecord.title,
        description: documentRecord.description || undefined,
        id_intern: documentRecord.id_intern || undefined,
        id_archive: documentRecord.id_archive || undefined,
        status_id: documentRecord.status_id || undefined,
        school_year_id: documentRecord.school_year_id || undefined,
        created_at: documentRecord.created_at
      })
    );
  }

  async save(document: Document): Promise<Document> {
    const documentData = document.toJSON();

    // Obtener status_id o usar "Activo" por defecto
    let statusId = documentData.status_id;
    if (!statusId) {
      const activeStatus = await prisma.status.findUnique({ where: { name: 'Activo' } });
      statusId = activeStatus?.id;
    }

    const savedDocument = await prisma.document.create({
      data: {
        id: documentData.id,
        title: documentData.title,
        description: documentData.description,
        id_intern: documentData.id_intern,
        id_archive: documentData.id_archive,
        status_id: statusId,
        school_year_id: documentData.school_year_id,
        created_at: documentData.created_at
      },
      include: { 
        status: true,
        school_year: true
      }
    });

    return Document.create({
      id: savedDocument.id,
      title: savedDocument.title,
      description: savedDocument.description || undefined,
      id_intern: savedDocument.id_intern || undefined,
      id_archive: savedDocument.id_archive || undefined,
      status_id: savedDocument.status_id || undefined,
      school_year_id: savedDocument.school_year_id || undefined,
      created_at: savedDocument.created_at
    });
  }

  async update(document: Document): Promise<Document> {
    const documentData = document.toJSON();

    const updatedDocument = await prisma.document.update({
      where: { id: documentData.id },
      data: {
        title: documentData.title,
        description: documentData.description,
        id_intern: documentData.id_intern,
        id_archive: documentData.id_archive,
        status_id: documentData.status_id,
        school_year_id: documentData.school_year_id
      },
      include: { 
        status: true,
        school_year: true
      }
    });

    return Document.create({
      id: updatedDocument.id,
      title: updatedDocument.title,
      description: updatedDocument.description || undefined,
      id_intern: updatedDocument.id_intern || undefined,
      id_archive: updatedDocument.id_archive || undefined,
      status_id: updatedDocument.status_id || undefined,
      school_year_id: updatedDocument.school_year_id || undefined,
      created_at: updatedDocument.created_at
    });
  }

  async softDelete(id: string): Promise<void> {
    const deletedStatus = await prisma.status.findUnique({ where: { name: 'Eliminado' } });
    if (deletedStatus) {
      await prisma.document.update({
        where: { id },
        data: { status_id: deletedStatus.id }
      });
    }
  }

  async delete(id: string): Promise<void> {
    await prisma.document.delete({
      where: { id }
    });
  }
}
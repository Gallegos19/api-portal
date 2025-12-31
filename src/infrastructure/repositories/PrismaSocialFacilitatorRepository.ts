import { SocialFacilitator } from "../../domain/entities/SocialFacilitator";
import { SocialFacilitatorRepository } from "../../domain/repositories/SocialFacilitatorRepository";
import prisma from "../database/prisma/client";

export class PrismaSocialFacilitatorRepository implements SocialFacilitatorRepository {
  async findById(id: string): Promise<SocialFacilitator | null> {
    const socialFacilitatorRecord = await prisma.socialFacilitator.findUnique({
      where: { id },
      include: { status: true }
    });

    if (!socialFacilitatorRecord) return null;

    return SocialFacilitator.create({
      id: socialFacilitatorRecord.id,
      id_user: socialFacilitatorRecord.id_user,
      id_region: socialFacilitatorRecord.id_region,
      status_id: socialFacilitatorRecord.status_id || undefined
    });
  }

  async findByUserId(userId: string): Promise<SocialFacilitator | null> {
    const socialFacilitatorRecord = await prisma.socialFacilitator.findUnique({
      where: { id_user: userId },
      include: { status: true }
    });

    if (!socialFacilitatorRecord) return null;

    return SocialFacilitator.create({
      id: socialFacilitatorRecord.id,
      id_user: socialFacilitatorRecord.id_user,
      id_region: socialFacilitatorRecord.id_region,
      status_id: socialFacilitatorRecord.status_id || undefined
    });
  }

  async findByRegionId(regionId: string): Promise<SocialFacilitator[]> {
    const socialFacilitatorRecords = await prisma.socialFacilitator.findMany({
      where: { 
        id_region: regionId,
        status: { name: { not: 'Eliminado' } }
      },
      include: { status: true }
    });

    return socialFacilitatorRecords.map((record) => 
      SocialFacilitator.create({
        id: record.id,
        id_user: record.id_user,
        id_region: record.id_region,
        status_id: record.status_id || undefined
      })
    );
  }

  async findBySubprojectId(subProjectId: string): Promise<SocialFacilitator[]> {
    const socialFacilitatorRecords = await prisma.socialFacilitator.findMany({
      where: { 
        subprojects: {
          some: {
            id: subProjectId
          }
        },
        status: { name: { not: 'Eliminado' } }
      },
      include: { status: true }
    });
    return socialFacilitatorRecords.map((record) => 
      SocialFacilitator.create({
        id: record.id,
        id_user: record.id_user,
        id_region: record.id_region,
        status_id: record.status_id || undefined
      })
    );
  }

  async findAll(): Promise<SocialFacilitator[]> {
    const socialFacilitatorRecords = await prisma.socialFacilitator.findMany({
      where: {
        status: { name: { not: 'Eliminado' } }
      },
      include: { status: true }
    });

    return socialFacilitatorRecords.map((record) => 
      SocialFacilitator.create({
        id: record.id,
        id_user: record.id_user,
        id_region: record.id_region,
        status_id: record.status_id || undefined
      })
    );
  }

  async save(socialFacilitator: SocialFacilitator): Promise<SocialFacilitator> {
    const data = socialFacilitator.toJSON();

    let statusId = data.status_id;
    if (!statusId) {
      const activeStatus = await prisma.status.findUnique({ where: { name: 'Activo' } });
      statusId = activeStatus?.id;
    }

    const savedRecord = await prisma.socialFacilitator.create({
      data: {
        id: data.id,
        id_user: data.id_user,
        id_region: data.id_region,
        status_id: statusId
      },
      include: { status: true }
    });

    return SocialFacilitator.create({
      id: savedRecord.id,
      id_user: savedRecord.id_user,
      id_region: savedRecord.id_region,
      status_id: savedRecord.status_id || undefined
    });
  }

  async update(socialFacilitator: SocialFacilitator): Promise<SocialFacilitator> {
    const data = socialFacilitator.toJSON();

    const updatedRecord = await prisma.socialFacilitator.update({
      where: { id: data.id },
      data: {
        id_region: data.id_region,
        status_id: data.status_id
      },
      include: { status: true }
    });

    return SocialFacilitator.create({
      id: updatedRecord.id,
      id_user: updatedRecord.id_user,
      id_region: updatedRecord.id_region,
      status_id: updatedRecord.status_id || undefined
    });
  }

  async softDelete(id: string): Promise<void> {
    const deletedStatus = await prisma.status.findUnique({ where: { name: 'Eliminado' } });
    if (deletedStatus) {
      await prisma.socialFacilitator.update({
        where: { id },
        data: { status_id: deletedStatus.id }
      });
    }
  }

  async delete(id: string): Promise<void> {
    await prisma.socialFacilitator.delete({
      where: { id }
    });
  }
}
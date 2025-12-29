import { SocialFacilitator } from "../../domain/entities/SocialFacilitator";
import { SocialFacilitatorRepository } from "../../domain/repositories/SocialFacilitatorRepository";
import prisma from "../database/prisma/client";

export class PrismaSocialFacilitatorRepository implements SocialFacilitatorRepository {
  async findById(id: string): Promise<SocialFacilitator | null> {
    const socialFacilitatorRecord = await prisma.socialFacilitator.findUnique({
      where: { id }
    });

    if (!socialFacilitatorRecord) return null;

    return SocialFacilitator.create({
      id: socialFacilitatorRecord.id,
      id_user: socialFacilitatorRecord.id_user,
      id_region: socialFacilitatorRecord.id_region
    });
  }

  async findByUserId(userId: string): Promise<SocialFacilitator | null> {
    const socialFacilitatorRecord = await prisma.socialFacilitator.findUnique({
      where: { id_user: userId }
    });

    if (!socialFacilitatorRecord) return null;

    return SocialFacilitator.create({
      id: socialFacilitatorRecord.id,
      id_user: socialFacilitatorRecord.id_user,
      id_region: socialFacilitatorRecord.id_region
    });
  }

  async findByRegionId(regionId: string): Promise<SocialFacilitator[]> {
    const socialFacilitatorRecords = await prisma.socialFacilitator.findMany({
      where: { id_region: regionId }
    });

    return socialFacilitatorRecords.map((record) => 
      SocialFacilitator.create({
        id: record.id,
        id_user: record.id_user,
        id_region: record.id_region
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
        }
      }
    });
    return socialFacilitatorRecords.map((record) => 
      SocialFacilitator.create({
        id: record.id,
        id_user: record.id_user,
        id_region: record.id_region
      })
    );
  }

  async findAll(): Promise<SocialFacilitator[]> {
    const socialFacilitatorRecords = await prisma.socialFacilitator.findMany();

    return socialFacilitatorRecords.map((record) => 
      SocialFacilitator.create({
        id: record.id,
        id_user: record.id_user,
        id_region: record.id_region
      })
    );
  }

  async save(socialFacilitator: SocialFacilitator): Promise<SocialFacilitator> {
    const data = socialFacilitator.toJSON();

    const savedRecord = await prisma.socialFacilitator.create({
      data: {
        id: data.id,
        id_user: data.id_user,
        id_region: data.id_region
      }
    });

    return SocialFacilitator.create({
      id: savedRecord.id,
      id_user: savedRecord.id_user,
      id_region: savedRecord.id_region
    });
  }

  async update(socialFacilitator: SocialFacilitator): Promise<SocialFacilitator> {
    const data = socialFacilitator.toJSON();

    const updatedRecord = await prisma.socialFacilitator.update({
      where: { id: data.id },
      data: {
        id_region: data.id_region
      }
    });

    return SocialFacilitator.create({
      id: updatedRecord.id,
      id_user: updatedRecord.id_user,
      id_region: updatedRecord.id_region
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.socialFacilitator.delete({
      where: { id }
    });
  }
}
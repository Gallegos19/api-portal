import { SocialFacilitator } from "../entities/SocialFacilitator";

export interface SocialFacilitatorRepository {
  findById(id: string): Promise<SocialFacilitator | null>;
  findByUserId(userId: string): Promise<SocialFacilitator | null>;
  findByRegionId(regionId: string): Promise<SocialFacilitator[]>;
  findBySubprojectId(subProjectId: string): Promise<SocialFacilitator[]>;
  findAll(): Promise<SocialFacilitator[]>;
  save(socialFacilitator: SocialFacilitator): Promise<SocialFacilitator>;
  update(socialFacilitator: SocialFacilitator): Promise<SocialFacilitator>;
  softDelete(id: string): Promise<void>;
  delete(id: string): Promise<void>;
}
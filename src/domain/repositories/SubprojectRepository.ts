import { Subproject } from "../entities/Subproject";

export interface SubprojectRepository {
  findById(id: string): Promise<Subproject | null>;
  findByRegionId(regionId: string): Promise<Subproject[]>;
  findByCoordinatorId(coordinatorId: string): Promise<Subproject | null>;
  findAll(): Promise<Subproject[]>;
  save(subproject: Subproject): Promise<Subproject>;
  update(subproject: Subproject): Promise<Subproject>;
  softDelete(id: string): Promise<void>;
  delete(id: string): Promise<void>;
}
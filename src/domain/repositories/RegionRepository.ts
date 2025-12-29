import { Region } from "../entities/Region";

export interface RegionRepository {
  findById(id: string): Promise<Region | null>;
  findByName(name: string): Promise<Region | null>;
  findAll(): Promise<Region[]>;
  save(region: Region): Promise<Region>;
  update(region: Region): Promise<Region>;
  delete(id: string): Promise<void>;
}
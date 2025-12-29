import { Region } from "../../../domain/entities/Region";
import { RegionRepository } from "../../../domain/repositories/RegionRepository";
import { CreateRegionDTO } from "../../dto/region/CreateRegionDTO";

export class CreateRegionUseCase {
  constructor(
    private regionRepository: RegionRepository
  ) {}

  async execute(data: CreateRegionDTO): Promise<Region> {
    // Check if a region with the same name already exists
    const existingRegion = await this.regionRepository.findByName(data.name_region);
    
    if (existingRegion) {
      throw new Error(`Region with name ${data.name_region} already exists`);
    }
    
    // Create region entity
    const region = Region.create({
      name_region: data.name_region
    });
    
    // Save the region
    return this.regionRepository.save(region);
  }
}
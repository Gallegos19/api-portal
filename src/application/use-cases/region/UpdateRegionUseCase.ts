import { Region } from "../../../domain/entities/Region";
import { RegionRepository } from "../../../domain/repositories/RegionRepository";
import { UpdateRegionDTO } from "../../dto/region/UpdateRegionDTO";

export class UpdateRegionUseCase {
  constructor(
    private regionRepository: RegionRepository
  ) {}

  async execute(id: string, data: UpdateRegionDTO): Promise<Region> {
    const region = await this.regionRepository.findById(id);
    
    if (!region) {
      throw new Error("Region not found");
    }

    // Update region properties
    if (data.name_region) region.updateNameRegion(data.name_region);

    return this.regionRepository.update(region);
  }
}

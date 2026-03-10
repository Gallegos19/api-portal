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
    if (data.status_id !== undefined) region.updateStatusId(data.status_id);
    if (data.id_coordinator !== undefined) region.updateCoordinatorId(data.id_coordinator);

    return this.regionRepository.update(region);
  }
}

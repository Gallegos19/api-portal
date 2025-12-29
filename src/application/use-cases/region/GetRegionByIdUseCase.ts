import { Region } from "../../../domain/entities/Region";
import { RegionRepository } from "../../../domain/repositories/RegionRepository";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

export class GetRegionByIdUseCase {
  constructor(
    private regionRepository: RegionRepository
  ) {}

  async execute(id: string): Promise<Region> {
    const region = await this.regionRepository.findById(id);
    
    if (!region) {
      throw new ResourceNotFoundError('Region', id);
    }
    
    return region;
  }
}

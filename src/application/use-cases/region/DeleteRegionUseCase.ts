import { RegionRepository } from "../../../domain/repositories/RegionRepository";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

export class DeleteRegionUseCase {
  constructor(private regionRepository: RegionRepository) {}

  async execute(id: string): Promise<void> {
    const region = await this.regionRepository.findById(id);
    
    if (!region) {
      throw new ResourceNotFoundError("Region", id);
    }

    await this.regionRepository.softDelete(id);
  }
}

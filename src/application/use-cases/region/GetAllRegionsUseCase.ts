import { Region } from "../../../domain/entities/Region";
import { RegionRepository } from "../../../domain/repositories/RegionRepository";

export class GetAllRegionsUseCase {
  constructor(
    private regionRepository: RegionRepository
  ) {}

  async execute(): Promise<Region[]> {
    const regions = await this.regionRepository.findAll();
    return regions;
  }
}

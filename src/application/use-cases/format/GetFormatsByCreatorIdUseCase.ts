import { Format } from "../../../domain/entities/Format";
import { FormatRepository } from "../../../domain/repositories/FormatRepository";

export class GetFormatsByCreatorIdUseCase {
  constructor(
    private formatRepository: FormatRepository
  ) {}

  async execute(creatorId: string): Promise<Format[]> {
    const formats = await this.formatRepository.findByCreatorId(creatorId);
    return formats;
  }
}

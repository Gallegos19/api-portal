import { Format } from "../../../domain/entities/Format";
import { FormatRepository } from "../../../domain/repositories/FormatRepository";

export class GetAllFormatsUseCase {
  constructor(
    private formatRepository: FormatRepository
  ) {}

  async execute(): Promise<Format[]> {
    const formats = await this.formatRepository.findAll();
    return formats;
  }
}

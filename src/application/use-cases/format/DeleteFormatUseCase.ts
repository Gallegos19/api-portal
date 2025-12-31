import { FormatRepository } from "../../../domain/repositories/FormatRepository";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

export class DeleteFormatUseCase {
  constructor(private formatRepository: FormatRepository) {}

  async execute(id: string): Promise<void> {
    const format = await this.formatRepository.findById(id);
    
    if (!format) {
      throw new ResourceNotFoundError("Format", id);
    }

    await this.formatRepository.softDelete(id);
  }
}

import { Format } from "../../../domain/entities/Format";
import { FormatRepository } from "../../../domain/repositories/FormatRepository";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

export class GetFormatByIdUseCase {
  constructor(
    private formatRepository: FormatRepository
  ) {}

  async execute(id: string): Promise<Format> {
    const format = await this.formatRepository.findById(id);
    
    if (!format) {
      throw new ResourceNotFoundError('Format', id);
    }
    
    return format;
  }
}

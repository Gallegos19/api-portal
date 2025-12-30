import { Format } from "../../../domain/entities/Format";
import { FormatRepository } from "../../../domain/repositories/FormatRepository";
import { UpdateFormatDTO } from "../../dto/format/UpdateFormatDTO";

export class UpdateFormatUseCase {
  constructor(
    private formatRepository: FormatRepository
  ) {}

  async execute(id: string, data: UpdateFormatDTO): Promise<Format> {
    const format = await this.formatRepository.findById(id);
    
    if (!format) {
      throw new Error("Format not found");
    }

    // Update format properties
    if (data.title) format.updateTitle(data.title);
    if (data.description !== undefined) format.updateDescription(data.description);
    if (data.id_archive !== undefined) format.updateArchiveId(data.id_archive);

    return this.formatRepository.update(format);
  }
}

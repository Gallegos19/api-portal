import { Format } from "../../../domain/entities/Format";
import { FormatRepository } from "../../../domain/repositories/FormatRepository";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { ArchiveRepository } from "../../../domain/repositories/ArchiveRepository";
import { CreateFormatDTO } from "../../dto/format/CreateFormatDT";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

export class CreateFormatUseCase {
  constructor(
    private formatRepository: FormatRepository,
    private userRepository: UserRepository,
    private archiveRepository: ArchiveRepository
  ) {}

  async execute(data: CreateFormatDTO): Promise<Format> {
    // Verify if creator user exists
    const user = await this.userRepository.findById(data.created_by);
    
    if (!user) {
      throw new ResourceNotFoundError('User', data.created_by);
    }
    
    // Verify if archive exists when provided
    if (data.id_archive) {
      const archive = await this.archiveRepository.findById(data.id_archive);
      
      if (!archive) {
        throw new ResourceNotFoundError('Archive', data.id_archive);
      }
    }
    
    // Create format entity
    const format = Format.create({
      title: data.title,
      description: data.description,
      id_archive: data.id_archive,
      created_by: data.created_by
    });
    
    // Save the format
    return this.formatRepository.save(format);
  }
}
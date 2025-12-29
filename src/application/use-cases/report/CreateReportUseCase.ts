import { Report } from "../../../domain/entities/Report";
import { ReportRepository } from "../../../domain/repositories/ReportRepository";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { ArchiveRepository } from "../../../domain/repositories/ArchiveRepository";
import { CreateReportDTO } from "../../dto/report/CreateReportDTO";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

export class CreateReportUseCase {
  constructor(
    private reportRepository: ReportRepository,
    private userRepository: UserRepository,
    private archiveRepository: ArchiveRepository
  ) {}

  async execute(data: CreateReportDTO): Promise<Report> {
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
    
    // Create report entity
    const report = Report.create({
      title: data.title,
      description: data.description,
      type: data.type,
      id_archive: data.id_archive,
      created_by: data.created_by
    });
    
    // Save the report
    return this.reportRepository.save(report);
  }
}
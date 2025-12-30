import { Report } from "../../../domain/entities/Report";
import { ReportRepository } from "../../../domain/repositories/ReportRepository";
import { UpdateReportDTO } from "../../dto/report/UpdateReportDTO";

export class UpdateReportUseCase {
  constructor(
    private reportRepository: ReportRepository
  ) {}

  async execute(id: string, data: UpdateReportDTO): Promise<Report> {
    const report = await this.reportRepository.findById(id);
    
    if (!report) {
      throw new Error("Report not found");
    }

    // Update report properties
    if (data.title) report.updateTitle(data.title);
    if (data.description !== undefined) report.updateDescription(data.description);
    if (data.type !== undefined) report.updateType(data.type);
    if (data.id_archive !== undefined) report.updateArchiveId(data.id_archive);

    return this.reportRepository.update(report);
  }
}

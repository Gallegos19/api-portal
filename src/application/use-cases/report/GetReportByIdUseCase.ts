import { Report } from "../../../domain/entities/Report";
import { ReportRepository } from "../../../domain/repositories/ReportRepository";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

export class GetReportByIdUseCase {
  constructor(
    private reportRepository: ReportRepository
  ) {}

  async execute(id: string): Promise<Report> {
    const report = await this.reportRepository.findById(id);
    
    if (!report) {
      throw new ResourceNotFoundError("Report", id);
    }
    
    return report;
  }
}

import { Report } from "../../../domain/entities/Report";
import { ReportRepository } from "../../../domain/repositories/ReportRepository";

export class GetReportsByTypeUseCase {
  constructor(
    private reportRepository: ReportRepository
  ) {}

  async execute(type: string): Promise<Report[]> {
    const reports = await this.reportRepository.findByType(type);
    return reports;
  }
}

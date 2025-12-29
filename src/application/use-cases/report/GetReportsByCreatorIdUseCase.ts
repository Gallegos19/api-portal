import { Report } from "../../../domain/entities/Report";
import { ReportRepository } from "../../../domain/repositories/ReportRepository";

export class GetReportsByCreatorIdUseCase {
  constructor(
    private reportRepository: ReportRepository
  ) {}

  async execute(creatorId: string): Promise<Report[]> {
    const reports = await this.reportRepository.findByCreatorId(creatorId);
    return reports;
  }
}

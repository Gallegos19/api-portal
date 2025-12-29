import { Report } from "../../../domain/entities/Report";
import { ReportRepository } from "../../../domain/repositories/ReportRepository";

export class GetAllReportsUseCase {
  constructor(
    private reportRepository: ReportRepository
  ) {}

  async execute(): Promise<Report[]> {
    const reports = await this.reportRepository.findAll();
    return reports;
  }
}

import { ReportRepository } from "../../../domain/repositories/ReportRepository";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

export class DeleteReportUseCase {
  constructor(private reportRepository: ReportRepository) {}

  async execute(id: string): Promise<void> {
    const report = await this.reportRepository.findById(id);
    
    if (!report) {
      throw new ResourceNotFoundError("Report", id);
    }

    await this.reportRepository.softDelete(id);
  }
}

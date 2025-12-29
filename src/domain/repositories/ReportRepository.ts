import { Report } from "../entities/Report";

export interface ReportRepository {
  findById(id: string): Promise<Report | null>;
  findByCreatorId(creatorId: string): Promise<Report[]>;
  findByType(type: string): Promise<Report[]>;
  findAll(): Promise<Report[]>;
  save(report: Report): Promise<Report>;
  update(report: Report): Promise<Report>;
  delete(id: string): Promise<void>;
}
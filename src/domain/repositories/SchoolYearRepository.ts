import { SchoolYear } from "../entities/SchoolYear";

export interface SchoolYearRepository {
  findById(id: string): Promise<SchoolYear | null>;
  findByName(name: string): Promise<SchoolYear | null>;
  findActive(): Promise<SchoolYear | null>;
  findAll(): Promise<SchoolYear[]>;
  save(schoolYear: SchoolYear): Promise<SchoolYear>;
  update(schoolYear: SchoolYear): Promise<SchoolYear>;
}

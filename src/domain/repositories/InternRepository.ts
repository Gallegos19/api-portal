import { Intern } from "../entities/Intern";

export interface InternRepository {
  findById(id: string): Promise<Intern | null>;
  findByUserId(userId: string): Promise<Intern | null>;
  findBySocialFacilitatorId(socialFacilitatorId: string): Promise<Intern[]>;
  findBySubprojectId(subprojectId: string): Promise<Intern[]>;
  findAll(): Promise<Intern[]>;
  save(intern: Intern): Promise<Intern>;
  update(intern: Intern): Promise<Intern>;
  delete(id: string): Promise<void>;
}
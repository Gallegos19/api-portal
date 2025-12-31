import { Status } from "../entities/Status";

export interface StatusRepository {
  findById(id: string): Promise<Status | null>;
  findByName(name: string): Promise<Status | null>;
  findAll(): Promise<Status[]>;
  save(status: Status): Promise<Status>;
}

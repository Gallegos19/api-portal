import { User } from "../entities/User";

export interface UserRepository {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  save(user: User): Promise<User>;
  update(user: User): Promise<User>;
  softDelete(id: string): Promise<void>;
  delete(id: string): Promise<void>;
}
import { User } from "../../../domain/entities/User";
import { UserRepository } from "../../../domain/repositories/UserRepository";

export class GetAllUsersUseCase {
  constructor(
    private userRepository: UserRepository
  ) {}

  async execute(): Promise<User[]> {
    // Retrieve all users from the repository
    const users = await this.userRepository.findAll();
    
    return users;
  }
}
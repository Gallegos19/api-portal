import { User } from "../../../domain/entities/User";
import { UserRepository } from "../../../domain/repositories/UserRepository";

export class GetUserByIdUseCase {
  constructor(
    private userRepository: UserRepository
  ) {}

  async execute(id: string): Promise<User> {
    // Retrieve the user by ID from the repository
    const user = await this.userRepository.findById(id);
    
    if (!user) {
      throw new Error(`User with ID ${id} not found`);
    }
    
    return user;
  }
}
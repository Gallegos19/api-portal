import { UserRepository } from "../../../domain/repositories/UserRepository";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

export class DeleteUserUseCase {
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);
    
    if (!user) {
      throw new ResourceNotFoundError("User", id);
    }

    await this.userRepository.softDelete(id);
  }
}

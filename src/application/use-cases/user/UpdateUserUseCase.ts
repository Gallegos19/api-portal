import { User } from "../../../domain/entities/User";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { UpdateUserDTO } from "../../dto/user/UpdateUserDTO";
import { UserNotFoundError, UserAlreadyExistsError } from "../../../shared/errors/CustomErrors";
import { PasswordService } from "../../interfaces/PasswordService";

export class UpdateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private passwordService: PasswordService
  ) {}

  async execute(id: string, data: UpdateUserDTO): Promise<User> {
    const user = await this.userRepository.findById(id);
    
    if (!user) {
      throw new UserNotFoundError();
    }

    // Check if email is being updated and if it's already taken by another user
    if (data.email && data.email !== user.email) {
      const existingUser = await this.userRepository.findByEmail(data.email);
      if (existingUser && existingUser.id !== id) {
        throw new UserAlreadyExistsError(data.email);
      }
    }

    // Update user properties
    if (data.first_name) user.updateFirstName(data.first_name);
    if (data.last_name) user.updateLastName(data.last_name);
    if (data.email) user.updateEmail(data.email);
    if (data.phone) user.updatePhone(data.phone);
    
    // Update password if provided (hash it first)
    if (data.password) {
      const hashedPassword = await this.passwordService.hash(data.password);
      user.updatePassword(hashedPassword);
    }

    return this.userRepository.update(user);
  }
}

import { User } from "../../../domain/entities/User";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { CreateUserDTO } from "../../dto/user/CreateUserDTO";
import { UserAlreadyExistsError } from "../../../shared/errors/CustomErrors";
import { PasswordService } from "../../interfaces/PasswordService";

export class CreateUserUseCase {
  constructor(
    private userRepository: UserRepository,
    private passwordService: PasswordService
  ) {}

  async execute(data: CreateUserDTO): Promise<User> {
    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(data.email);
    
    if (existingUser) {
      throw new UserAlreadyExistsError(data.email);
    }
    
    const hashedPassword = await this.passwordService.hash(data.password);
    
    // Create user entity (excluding password which will be handled separately)
    const user = User.create({
      first_name: data.first_name,
      last_name: data.last_name,
      email: data.email,
      password: hashedPassword, 
      birth_date: data.birth_date,
      sex: data.sex,
      phone: data.phone,
      role: data.role || 'intern',
    });
    
    // Save the user along with the password (handled in repository implementation)
    return this.userRepository.save(user);
  }
}
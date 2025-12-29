import { UserRepository } from "../../../domain/repositories/UserRepository";
import { PasswordService } from "../../interfaces/PasswordService";
import { TokenService } from "../../interfaces/TokenService";
import { InvalidCredentialsError } from "../../../shared/errors/CustomErrors";

interface LoginDTO {
  email: string;
  password: string;
}

interface LoginResponse {
  token: string;
  user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    role?: string;
  };
}

export class LoginUseCase {
  constructor(
    private userRepository: UserRepository,
    private passwordService: PasswordService,
    private tokenService: TokenService
  ) {}

  async execute({ email, password }: LoginDTO): Promise<LoginResponse> {
    // Find user by email
    const user = await this.userRepository.findByEmail(email);
    
    if (!user) {
      throw new InvalidCredentialsError();
    }

    // Compare password with hashed password
    const isPasswordValid = await this.passwordService.compare(password, user.password);

    if (!isPasswordValid) {
        throw new InvalidCredentialsError();
      }

    
    // Generate token
    const token = this.tokenService.generate({
      userId: user.id,
      email: user.email,
      role: user.role
    });
    
    return {
      token,
      user: {
        id: user.id,
        email: user.email,
        first_name: user.firstName,
        last_name: user.lastName,
        role: user.role
      }
    };
  }
}
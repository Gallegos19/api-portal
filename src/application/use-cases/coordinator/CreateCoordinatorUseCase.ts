import { Coordinator } from "../../../domain/entities/Coordinator";
import { CoordinatorRepository } from "../../../domain/repositories/CoordinatorRepository";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { RegionRepository } from "../../../domain/repositories/RegionRepository";
import { CreateCoordinatorDTO } from "../../dto/coordinator/CreateCoordinatorDTO";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

export class CreateCoordinatorUseCase {
  constructor(
    private coordinatorRepository: CoordinatorRepository,
    private userRepository: UserRepository,
    private regionRepository: RegionRepository
  ) {}

  async execute(data: CreateCoordinatorDTO): Promise<Coordinator> {
    // Verify if user exists
    const user = await this.userRepository.findById(data.id_user);
    
    if (!user) {
      throw new ResourceNotFoundError('User', data.id_user);
    }
    
    // Verify if region exists
    const region = await this.regionRepository.findById(data.id_region);
    
    if (!region) {
      throw new ResourceNotFoundError('Region', data.id_region);
    }
    
    // Check if the user is already a coordinator
    const existingCoordinator = await this.coordinatorRepository.findByUserId(data.id_user);
    
    if (existingCoordinator) {
      throw new Error(`User with ID ${data.id_user} is already a coordinator`);
    }
    
    // Create coordinator entity
    const coordinator = Coordinator.create({
      id_user: data.id_user,
      id_region: data.id_region
    });
    
    // Save the coordinator
    return this.coordinatorRepository.save(coordinator);
  }
}
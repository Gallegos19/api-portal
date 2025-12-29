import { Intern } from "../../../domain/entities/Intern";
import { InternRepository } from "../../../domain/repositories/InternRepository";
import { UserRepository } from "../../../domain/repositories/UserRepository";
import { CreateInternDTO } from "../../dto/intern/CreateInternDTO";
import { ResourceNotFoundError } from "../../../shared/errors/CustomErrors";

export class CreateInternUseCase {
  constructor(
    private internRepository: InternRepository,
    private userRepository: UserRepository
  ) {}

  async execute(data: CreateInternDTO): Promise<Intern> {
    // Verify if user exists
    const user = await this.userRepository.findById(data.id_user);
    
    if (!user) {
      throw new ResourceNotFoundError('User', data.id_user);
    }
    
    // Check if the user is already an intern
    const existingIntern = await this.internRepository.findByUserId(data.id_user);
    
    if (existingIntern) {
      throw new Error(`User with ID ${data.id_user} is already an intern`);
    }
    
    // Create intern entity
    const intern = Intern.create({
      chid: data.chid,
      id_user: data.id_user,
      status: data.status !== undefined ? data.status : true,
      address: data.address,
      education_level: data.education_level,
      career_name: data.career_name,
      grade: data.grade,
      name_tutor: data.name_tutor,
      service: data.service,
      documentation: data.documentation,
      id_subproject: data.id_subproject,
      id_social_facilitator: data.id_social_facilitator,
      start_date: data.start_date,
      end_date: data.end_date
    });
    
    // Save the intern
    return this.internRepository.save(intern);
  }
}
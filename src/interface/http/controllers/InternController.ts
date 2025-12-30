import { Request, Response } from 'express';
import { CreateInternUseCase } from '../../../application/use-cases/intern/CreateInternUseCase';
import { GetAllInternsUseCase } from '../../../application/use-cases/intern/GetAllInternsUseCase';
import { GetInternByIdUseCase } from '../../../application/use-cases/intern/GetInternByIdUseCase';
import { GetInternByUserIdUseCase } from '../../../application/use-cases/intern/GetInternByUserIdUseCase';
import { GetInternsBySocialFacilitatorIdUseCase } from '../../../application/use-cases/intern/GetInternsBySocialFacilitatorIdUseCase';
import { GetInternsBySubprojectIdUseCase } from '../../../application/use-cases/intern/GetInternsBySubprojectIdUseCase';
import { UpdateInternUseCase } from '../../../application/use-cases/intern/UpdateInternUseCase';
import { ResourceNotFoundError } from '../../../shared/errors/CustomErrors';

export class InternController {
  constructor(
    private readonly createInternUseCase: CreateInternUseCase,
    private readonly getAllInternsUseCase: GetAllInternsUseCase,
    private readonly getInternByIdUseCase: GetInternByIdUseCase,
    private readonly getInternByUserIdUseCase: GetInternByUserIdUseCase,
    private readonly getInternsBySocialFacilitatorIdUseCase: GetInternsBySocialFacilitatorIdUseCase,
    private readonly getInternsBySubprojectIdUseCase: GetInternsBySubprojectIdUseCase,
    private readonly updateInternUseCase: UpdateInternUseCase
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const {
        chid,
        id_user,
        status,
        address,
        education_level,
        career_name,
        grade,
        name_tutor,
        service,
        documentation,
        id_subproject,
        id_social_facilitator,
        start_date,
        end_date
      } = req.body;

      const intern = await this.createInternUseCase.execute({
        chid,
        id_user,
        status,
        address,
        education_level,
        career_name,
        grade,
        name_tutor,
        service,
        documentation,
        id_subproject,
        id_social_facilitator,
        start_date: start_date ? new Date(start_date) : undefined,
        end_date: end_date ? new Date(end_date) : undefined
      });

      return res.status(201).json({
        id: intern.id,
        chid: intern.chid,
        id_user: intern.userId,
        status: intern.status,
        address: intern.address,
        education_level: intern.educationLevel,
        career_name: intern.careerName,
        grade: intern.grade,
        name_tutor: intern.nameTutor,
        service: intern.service,
        documentation: intern.documentation,
        id_subproject: intern.subprojectId,
        id_social_facilitator: intern.socialFacilitatorId,
        start_date: intern.startDate,
        end_date: intern.endDate
      });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      
      if (error instanceof Error) {
        if (error.message.includes('already an intern')) {
          return res.status(409).json({ message: error.message });
        }
      }
      
      console.error('Error creating intern:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const interns = await this.getAllInternsUseCase.execute();
      
      return res.status(200).json(interns.map(intern => ({
        id: intern.id,
        chid: intern.chid,
        id_user: intern.userId,
        status: intern.status,
        address: intern.address,
        education_level: intern.educationLevel,
        career_name: intern.careerName,
        grade: intern.grade,
        name_tutor: intern.nameTutor,
        service: intern.service,
        documentation: intern.documentation,
        id_subproject: intern.subprojectId,
        id_social_facilitator: intern.socialFacilitatorId,
        start_date: intern.startDate,
        end_date: intern.endDate
      })));
    } catch (error) {
      console.error('Error getting interns:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const intern = await this.getInternByIdUseCase.execute(id);
      
      return res.status(200).json({
        id: intern.id,
        chid: intern.chid,
        id_user: intern.userId,
        status: intern.status,
        address: intern.address,
        education_level: intern.educationLevel,
        career_name: intern.careerName,
        grade: intern.grade,
        name_tutor: intern.nameTutor,
        service: intern.service,
        documentation: intern.documentation,
        id_subproject: intern.subprojectId,
        id_social_facilitator: intern.socialFacilitatorId,
        start_date: intern.startDate,
        end_date: intern.endDate
      });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      console.error('Error getting intern:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getByUserId(req: Request, res: Response): Promise<Response> {
    try {
      const { userId } = req.params;
      const intern = await this.getInternByUserIdUseCase.execute(userId);
      
      return res.status(200).json({
        id: intern.id,
        chid: intern.chid,
        id_user: intern.userId,
        status: intern.status,
        address: intern.address,
        education_level: intern.educationLevel,
        career_name: intern.careerName,
        grade: intern.grade,
        name_tutor: intern.nameTutor,
        service: intern.service,
        documentation: intern.documentation,
        id_subproject: intern.subprojectId,
        id_social_facilitator: intern.socialFacilitatorId,
        start_date: intern.startDate,
        end_date: intern.endDate
      });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      console.error('Error getting intern by user ID:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getBySocialFacilitatorId(req: Request, res: Response): Promise<Response> {
    try {
      const { facilitatorId } = req.params;
      const interns = await this.getInternsBySocialFacilitatorIdUseCase.execute(facilitatorId);
      
      return res.status(200).json(interns.map(intern => ({
        id: intern.id,
        chid: intern.chid,
        id_user: intern.userId,
        status: intern.status,
        address: intern.address,
        education_level: intern.educationLevel,
        career_name: intern.careerName,
        grade: intern.grade,
        name_tutor: intern.nameTutor,
        service: intern.service,
        documentation: intern.documentation,
        id_subproject: intern.subprojectId,
        id_social_facilitator: intern.socialFacilitatorId,
        start_date: intern.startDate,
        end_date: intern.endDate
      })));
    } catch (error) {
      console.error('Error getting interns by social facilitator ID:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async getBySubprojectId(req: Request, res: Response): Promise<Response> {
    try {
      const { subprojectId } = req.params;
      const interns = await this.getInternsBySubprojectIdUseCase.execute(subprojectId);
      
      return res.status(200).json(interns.map(intern => ({
        id: intern.id,
        chid: intern.chid,
        id_user: intern.userId,
        status: intern.status,
        address: intern.address,
        education_level: intern.educationLevel,
        career_name: intern.careerName,
        grade: intern.grade,
        name_tutor: intern.nameTutor,
        service: intern.service,
        documentation: intern.documentation,
        id_subproject: intern.subprojectId,
        id_social_facilitator: intern.socialFacilitatorId,
        start_date: intern.startDate,
        end_date: intern.endDate
      })));
    } catch (error) {
      console.error('Error getting interns by subproject ID:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const {
        status,
        address,
        education_level,
        career_name,
        grade,
        name_tutor,
        service,
        documentation,
        id_subproject,
        id_social_facilitator
      } = req.body;

      const intern = await this.updateInternUseCase.execute(id, {
        status,
        address,
        education_level,
        career_name,
        grade,
        name_tutor,
        service,
        documentation,
        id_subproject,
        id_social_facilitator
      });

      return res.status(200).json({
        id: intern.id,
        chid: intern.chid,
        id_user: intern.userId,
        status: intern.status,
        address: intern.address,
        education_level: intern.educationLevel,
        career_name: intern.careerName,
        grade: intern.grade,
        name_tutor: intern.nameTutor,
        service: intern.service,
        documentation: intern.documentation,
        id_subproject: intern.subprojectId,
        id_social_facilitator: intern.socialFacilitatorId,
        start_date: intern.startDate,
        end_date: intern.endDate
      });
    } catch (error) {
      if (error instanceof ResourceNotFoundError) {
        return res.status(404).json({ message: error.message });
      }
      console.error('Error updating intern:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
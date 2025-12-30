import { Request, Response } from "express";
import { CreateUserUseCase } from "../../../application/use-cases/user/CreateUserUseCase";
import { UserAlreadyExistsError } from "../../../shared/errors/CustomErrors";
import { GetAllUsersUseCase } from "@application/use-cases/user/GetAllUsersUseCase";
import { GetUserByIdUseCase } from "@application/use-cases/user/GetUserByIdUseCase";
import { UpdateUserUseCase } from "@application/use-cases/user/UpdateUserUseCase";

export class UserController {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly getUserById: GetUserByIdUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase
  ) {}

  async create(req: Request, res: Response): Promise<Response> {
    try {
      const {
        first_name,
        last_name,
        email,
        password,
        birth_date,
        sex,
        phone,
        role,
      } = req.body;

      const user = await this.createUserUseCase.execute({
        first_name,
        last_name,
        email,
        password,
        birth_date: birth_date ? new Date(birth_date) : undefined,
        sex,
        phone,
        role,
      });

      return res.status(201).json({
        id: user.id,
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        created_at: user.createdAt,
      });
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
        return res.status(409).json({ message: error.message });
      }

      console.error("Error creating user:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getAll(req: Request, res: Response): Promise<Response> {
    try {
      const users = await this.getAllUsersUseCase.execute();

      return res.status(200).json(users);
    } catch (error) {
      console.error("Error getting users:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async getById(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const user = await this.getUserById.execute(id);
      return res.status(200).json(user);
    } catch (error) {
      console.error("Error getting user:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async update(req: Request, res: Response): Promise<Response> {
    try {
      const { id } = req.params;
      const {
        first_name,
        last_name,
        email,
        password,
        birth_date,
        sex,
        phone,
        role,
      } = req.body;

      const user = await this.updateUserUseCase.execute(id, {
        first_name,
        last_name,
        email,
        password,
        birth_date: birth_date ? new Date(birth_date) : undefined,
        sex,
        phone,
        role,
      });

      return res.status(200).json({
        id: user.id,
        first_name: user.firstName,
        last_name: user.lastName,
        email: user.email,
        created_at: user.createdAt,
      });
    } catch (error) {
      if (error instanceof UserAlreadyExistsError) {
        return res.status(409).json({ message: error.message });
      }

      console.error("Error updating user:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  }
}

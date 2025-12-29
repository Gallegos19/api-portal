import { Request, Response } from 'express';
import { LoginUseCase } from '../../../application/use-cases/auth/LoginUseCase';
import { InvalidCredentialsError } from '../../../shared/errors/CustomErrors';

export class AuthController {
  constructor(private readonly loginUseCase: LoginUseCase) {}

  async login(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
      }

      const result = await this.loginUseCase.execute({ email, password });

      return res.status(200).json(result);
    } catch (error) {
      if (error instanceof InvalidCredentialsError) {
        return res.status(401).json({ message: error.message });
      }
      
      console.error('Error in login:', error);
      return res.status(500).json({ message: 'Internal server error' });
    }
  }
}
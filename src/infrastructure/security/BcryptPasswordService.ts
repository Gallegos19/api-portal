import bcrypt from 'bcrypt';
import { PasswordService } from '../../application/interfaces/PasswordService';

export class BcryptPasswordService implements PasswordService {
  private readonly saltRounds = parseInt(process.env.BCRYPT_SALT_ROUNDS || "10");


  async hash(password: string): Promise<string> {
    return bcrypt.hash(password, this.saltRounds);
  }

  async compare(plainText: string, hashedPassword: string): Promise<boolean> {
    return bcrypt.compare(plainText, hashedPassword);
  }
}
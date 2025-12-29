import jwt from 'jsonwebtoken';
import { TokenPayload, TokenService } from '../../application/interfaces/TokenService';

export class JwtTokenService implements TokenService {
  private readonly secret: string;
  private readonly expiresIn: string;

  constructor(secret: string, expiresIn: string = '24h') {
    this.secret = secret;
    this.expiresIn = expiresIn;
  }

  generate(payload: TokenPayload): string {
    return jwt.sign(payload as any, this.secret, { expiresIn: this.expiresIn } as any);
  }

  verify(token: string): TokenPayload {
    const decoded = jwt.verify(token, this.secret) as TokenPayload;
    return decoded;
  }
}
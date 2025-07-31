import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  // Aquí iría lógica real de validación de usuario
  async validateUser(username: string, pass: string): Promise<any> {
    if (username === 'admin' && pass === '1234') {
      return { userId: 1, username: 'admin' };
    }
    return null;
  }
}

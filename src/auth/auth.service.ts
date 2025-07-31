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
  
  async validateUser(username: string, pass: string): Promise<any> {
    const JWT_USER = process.env.JWT_USER;
    const JWT_PASSWORD = process.env.JWT_PASSWORD;
    if (username === JWT_USER && pass === JWT_PASSWORD) {
      return { userId: 1, username: 'admin' };
    }
    return null;
  }
}

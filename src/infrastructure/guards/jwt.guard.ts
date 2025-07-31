import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class JwtGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers['authorization'];
    if (!authHeader) return false;
    const token = authHeader.replace('Bearer ', '');
    try {
      jwt.verify(token, process.env.JWT_SECRET);
      return true;
    } catch {
      return false;
    }
  }
}

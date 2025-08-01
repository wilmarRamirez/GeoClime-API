import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

/**
 * Guard que protege rutas mediante verificación manual de un token JWT.
 * Extrae el token del encabezado `Authorization` y lo valida usando `JWT_SECRET`.
 */
@Injectable()
export class JwtGuard implements CanActivate {
    /**
   * Verifica si la solicitud contiene un token JWT válido.
   *
   * @param {ExecutionContext} context - Contexto de ejecución que permite acceder a la solicitud HTTP.
   * @returns {boolean} `true` si el token es válido, `false` si es inválido o está ausente.
   */
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

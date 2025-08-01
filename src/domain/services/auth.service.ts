import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

/**
 * Servicio de autenticación que maneja la validación de usuarios y generación de tokens JWT.
 */
@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService,
    private configService: ConfigService
  ) {}

   /**
   * Genera un token JWT para un usuario autenticado.
   *
   * @param {any} user - Objeto del usuario autenticado. Debe contener `username` y `userId`.
   * @returns {Promise<{ access_token: string }>} Token JWT firmado.
   */
  async login(user: any) {
    const payload = { username: user.username, sub: user.userId };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

   /**
   * Valida las credenciales del usuario comparándolas con las almacenadas en variables de entorno.
   *
   * @param {string} username - Nombre de usuario ingresado.
   * @param {string} pass - Contraseña ingresada.
   * @returns {Promise<any>} Objeto del usuario si las credenciales son válidas, o `null` si no lo son.
   */
  async validateUser(username: string, pass: string): Promise<any> {
    const JWT_USER = this.configService.get<string>('JWT_USER');
    const JWT_PASSWORD = this.configService.get<string>('JWT_PASSWORD');
    if (username === JWT_USER && pass === JWT_PASSWORD) {
      return { userId: 1, username: 'admin' };
    }
    return null;
  }
}

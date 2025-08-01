import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';

/**
 * Estrategia JWT utilizada por Passport para validar y autenticar usuarios
 * basándose en el token proporcionado en el encabezado Authorization.
 */
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
   /**
   * Constructor que configura la estrategia JWT con los parámetros necesarios.
   *
   * @param {ConfigService} configService - Servicio para acceder a variables de entorno.
   */
  constructor(private configService: ConfigService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>('JWT_SECRET'),
    });
  }
 /**
   * Método que se ejecuta automáticamente al validar un JWT exitoso.
   *
   * @param {any} payload - Carga útil (payload) del JWT decodificado.
   * @returns {{ userId: number, username: string }} Objeto con información del usuario autenticado.
   */
  async validate(payload: any) {
    return { userId: payload.sub, username: payload.username };
  }
}

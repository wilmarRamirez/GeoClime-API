import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

/**
 * Guard que protege rutas utilizando una API Key.
 * Verifica que la cabecera `x-api-key` coincida con la clave esperada.
 */
@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

   /**
   * Determina si la solicitud puede continuar según la validez de la API Key.
   *
   * @param {ExecutionContext} context - Contexto de ejecución que proporciona acceso a la solicitud HTTP.
   * @returns {boolean} Retorna `true` si la API Key es válida, de lo contrario lanza una excepción.
   * @throws {UnauthorizedException} Si la API Key es inválida o está ausente.
   */
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<Request>();
    const apiKeyHeader = request.headers['x-api-key'];
    const validApiKey = this.configService.get<string>('API_KEY');

    if (apiKeyHeader !== validApiKey) {
      throw new UnauthorizedException('API Key inválida o ausente');
    }

    return true;
  }
}

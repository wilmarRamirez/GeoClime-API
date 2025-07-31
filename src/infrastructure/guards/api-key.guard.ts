import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

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

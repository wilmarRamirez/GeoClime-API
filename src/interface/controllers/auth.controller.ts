import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../../domain/services/auth.service';
import { LoginDto } from '../../application/dto/createLogin.dto';

/**
 * Controlador encargado de manejar las operaciones de autenticación.
 */
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  /**
 * Endpoint para iniciar sesión.
 * Valida las credenciales proporcionadas y retorna un token JWT si son correctas.
 *
 * @param {any} body - Cuerpo de la solicitud que contiene `username` y `password`.
 * @returns {Promise<{ access_token: string }>} Objeto con el token de acceso.
 * @throws {UnauthorizedException} Si las credenciales son inválidas.
 *
 * @example
 * POST /auth/login
 * {
 *   "username": "admin",
 *   "password": "123456"
 * }
 */
  @Post('login')
  async login(@Body() body: LoginDto) {
    const user = await this.authService.validateUser(
      body.username,
      body.password,
    );
    if (!user) throw new UnauthorizedException('Invalid credentials');
    return this.authService.login(user);
  }
}

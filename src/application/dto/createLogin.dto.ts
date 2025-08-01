import { IsString,  IsNotEmpty, } from 'class-validator';

/**
 * DTO (Data Transfer Object) para la solicitud de inicio de sesión.
 * Contiene las credenciales del usuario necesarias para autenticarse.
 */
export class LoginDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}

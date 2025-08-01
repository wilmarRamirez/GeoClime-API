import { IsString, IsNotEmpty, IsNumber } from 'class-validator';

/**
 * Data Transfer Object (DTO) para la creación de un nuevo registro.
 * Contiene la información necesaria como zona, marca de tiempo y temperatura.
 */
export class CreateRecordDto {
  @IsString()
  @IsNotEmpty()
  zone: string;

  @IsString()
  @IsNotEmpty()
  timestamp: string;

  @IsNumber()
  @IsNotEmpty()
  temperature: number;
}

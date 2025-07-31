import { IsString, IsOptional, IsNotEmpty, IsNumber, IsDate } from 'class-validator';

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

import { Injectable } from '@nestjs/common';
import { Record } from '../../domain/entities/record.entity';
import { MemoryRecordsRepository } from '../../infrastructure/repositories/memoryRecords.repository';

/**
 * Caso de uso para la creación y consulta de registros.
 * Encapsula la lógica de negocio para interactuar con el repositorio de memoria.
 */
@Injectable()
export class CreateRecordUseCase {
  constructor(private readonly repo: MemoryRecordsRepository) { }

  /**
 * Crea un nuevo registro con los datos proporcionados y lo guarda en el repositorio.
 *
 * @param {string} zone - Zona geográfica donde se realizó el registro.
 * @param {string} timestamp - Fecha y hora del registro en formato ISO 8601.
 * @param {number} temperature - Temperatura registrada en grados Celsius.
 */
  execute(zone: string, timestamp: string, temperature: number) {
    //const record = new Record(id, zone, timestamp, temperature);
    const record = new Record(zone, new Date(timestamp), temperature);
    this.repo.create(record);
  }

  /**
   * Retorna todos los registros almacenados en el repositorio.
   *
   * @returns {Record[]} Arreglo de registros.
   */
  getAll(): Record[] {
    return this.repo.findAll();
  }
}

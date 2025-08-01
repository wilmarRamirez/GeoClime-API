import { Injectable } from '@nestjs/common';
import { Record } from '../../domain/entities/record.entity';

/**
 * Repositorio en memoria para almacenar y consultar registros de temperatura.
 * Simula una base de datos persistiendo datos en una variable local.
 */
@Injectable()
export class MemoryRecordsRepository {
  private records: Record[] = [];

    /**
   * Guarda un nuevo registro en memoria.
   *
   * @param {Record} record - Registro a almacenar.
   * @returns {Record} El mismo registro que fue almacenado.
   */
  create(record: Record): Record {
    this.records.push(record);
    return record;
  }

   /**
   * Obtiene todos los registros pertenecientes a una zona específica,
   * ordenados por la fecha del registro (timestamp) en orden ascendente.
   *
   * @param {string} zone - Nombre de la zona a buscar.
   * @returns {Record[]} Arreglo de registros correspondientes a la zona.
   */
  findByZone(zone: string): Record[] {
    return this.records.filter(r => r.zone === zone).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  }

   /**
   * Retorna todos los registros almacenados en memoria.
   *
   * @returns {Record[]} Arreglo completo de registros.
   */
  findAll(): Record[] {
    return this.records;
  }
}

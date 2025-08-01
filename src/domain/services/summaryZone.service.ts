import { Injectable } from '@nestjs/common';
import { Record } from '../../domain/entities/record.entity';

/**
 * Servicio encargado de calcular un resumen estadístico de temperatura por zona.
 */
@Injectable()
export class SummaryZoneService {
    /**
   * Calcula estadísticas de temperatura a partir de una lista de registros de una misma zona.
   *
   * @param {Record[]} records - Arreglo de registros de una misma zona.
   * @returns {{
   *   zone: string,
   *   averageTemperature: number,
   *   minTemperature: number,
   *   maxTemperature: number,
   *   recordsCount: number
   * } | null} Objeto con el resumen de estadísticas o `null` si no hay registros.
   */
  summary(records: Record[]) {
    if (!records || records.length === 0) return null;

    let totalTemperature = 0;
    let minTemperature = records[0].temperature;
    let maxTemperature = records[0].temperature;

    for (const record of records) {
      totalTemperature += record.temperature;
      if (record.temperature < minTemperature) {
        minTemperature = record.temperature;
      }
      if (record.temperature > maxTemperature) {
        maxTemperature = record.temperature;
      }
    }

    const averageTemperature = totalTemperature / records.length;

    return {
      zone: records[0].zone,
      averageTemperature,
      minTemperature,
      maxTemperature,
      recordsCount: records.length,
    };
  }
}

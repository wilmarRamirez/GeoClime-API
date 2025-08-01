import { Injectable } from '@nestjs/common';
import { Record } from '../entities/record.entity';

/**
 * Servicio encargado de detectar anomalías en registros de temperatura.
 * Una anomalía se define como una secuencia de al menos 3 registros consecutivos
 * donde la diferencia de temperatura entre registros consecutivos es igual o mayor a 1.5 grados Celsius.
 */
@Injectable()
export class AnomalyDetectorService {
  /**
  * Detecta secuencias de registros que presentan variaciones anómalas de temperatura.
  *
  * @param {Record[]} records - Arreglo de registros a analizar.
  * @returns {Record[][]} Arreglo de secuencias de registros considerados como anomalías.
  */
  detect(records: Record[]): Record[][] {
    const anomalies: Record[][] = [];

    let sequence: Record[] = [];

    const sortedRecords = [...records].sort(
      (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    for (let i = 1; i < sortedRecords.length; i++) {

      const prev = sortedRecords[i - 1];

      const curr = sortedRecords[i];

      const diff = curr.temperature - prev.temperature;

      if (Math.abs(diff) >= 1.5) {
        if (sequence.length === 0) sequence.push(prev);

        sequence.push(curr);
      } else {
        if (sequence.length >= 3) anomalies.push([...sequence]);

        sequence = [];
      }
    }

    if (sequence.length >= 3) {
      anomalies.push([...sequence]);
    }

    return anomalies;
  }
}

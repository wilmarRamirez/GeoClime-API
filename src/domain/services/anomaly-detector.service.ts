import { Injectable } from '@nestjs/common';
import { Record } from '../../domain/entities/record.entity';


@Injectable()
export class AnomalyDetectorService {
  detect(records: Record[]): Record[][] {
    const anomalies: Record[][] = [];
    let sequence: Record[] = [];

    const sortedRecords = [...records].sort(
      (a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
    );

    for (let i = 1; i < sortedRecords.length; i++) {
      const diff = sortedRecords[i].temperature - sortedRecords[i - 1].temperature;
      if (Math.abs(diff) >= 1.5) {
        if (sequence.length === 0) sequence.push(sortedRecords[i - 1]);
        sequence.push(sortedRecords[i]);
      } else {
        if (sequence.length >= 3) anomalies.push([...sequence]);
        sequence = [];
      }
    }

    if (sequence.length >= 3) anomalies.push(sequence);

    return anomalies;
  }
}

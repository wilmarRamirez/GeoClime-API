import { Injectable } from '@nestjs/common';
import { Record } from '../../domain/entities/record.entity';

@Injectable()
export class MemoryRecordsRepository {
  private records: Record[] = [];

  create(record: Record): Record {
    this.records.push(record);
    return record;
  }

  findByZone(zone: string): Record[] {
    return this.records.filter(r => r.zone === zone).sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime());
  }

  findAll(): Record[] {
    return this.records;
  }
}

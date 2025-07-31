import { Injectable } from '@nestjs/common';
import { Record } from '../../domain/entities/record.entity';
import { MemoryRecordsRepository } from '../../infrastructure/repositories/memory-records.repository';

@Injectable()
export class CreateRecordUseCase {
  constructor(private readonly repo: MemoryRecordsRepository) {}

  execute(zone: string, timestamp: string, temperature: number) {
    //const record = new Record(id, zone, timestamp, temperature);
    const record = new Record(zone, new Date(timestamp), temperature);
    this.repo.create(record);
  }
  getAll(): Record[] {
    return this.repo.findAll(); 
  }
}

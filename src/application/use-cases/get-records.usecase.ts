import { Injectable } from '@nestjs/common';
import { MemoryRecordsRepository } from '../../infrastructure/repositories/memory-records.repository';
import { Record } from '../../domain/entities/record.entity';

@Injectable()
export class GetRecordsUseCase {
  constructor(private readonly repo: MemoryRecordsRepository) {}

  execute(): Record[] {
    return this.repo.findAll();
  }
}

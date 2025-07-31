import { Injectable } from '@nestjs/common';
import { AnomalyDetectorService } from '../../domain/services/anomaly-detector.service';
import { MemoryRecordsRepository } from '../../infrastructure/repositories/memory-records.repository';
import { Record } from '../../domain/entities/record.entity';


@Injectable()
export class DetectAnomaliesUseCase {
  constructor(
    private readonly repo: MemoryRecordsRepository,
    private readonly detector: AnomalyDetectorService,
  ) {}

  execute(): Record[][] {
    const records = this.repo.findAll();
    return this.detector.detect(records);
  }
}

import { Injectable } from '@nestjs/common';
import { AnomalyDetectorService } from '../../domain/services/anomalyDetector.service';
import { MemoryRecordsRepository } from '../../infrastructure/repositories/memoryRecords.repository';
import { Record } from '../../domain/entities/record.entity';

/**
 * Caso de uso para la detección de anomalías en los registros.
 * Utiliza un servicio de detección de anomalías para analizar los datos del repositorio.
 */
@Injectable()
export class DetectAnomaliesUseCase {
  constructor(
    private readonly repo: MemoryRecordsRepository,
    private readonly detector: AnomalyDetectorService,
  ) { }

  /**
  * Ejecuta la lógica de detección de anomalías.
  * Obtiene todos los registros del repositorio y aplica el servicio de detección.
  *
  * @returns {Record[][]} Un arreglo de secuencias de registros que representan anomalías detectadas.
  */
  execute(): Record[][] {
    const records = this.repo.findAll();
    return this.detector.detect(records);
  }
}

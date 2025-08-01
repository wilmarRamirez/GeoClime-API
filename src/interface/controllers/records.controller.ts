import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
} from '@nestjs/common';
import { CreateRecordDto } from '../../application/dto/createRecord.dto';
import { CreateRecordUseCase } from '../../application/use-cases/createRecord.usecase';
import { AnomalyDetectorService } from "../../domain/services/anomalyDetector.service";
import { SummaryZoneService } from "../../domain/services/summaryZone.service";
import { ApiKeyGuard } from '../../infrastructure/guards/apiKey.guard';
import { JwtGuard } from '../../infrastructure/guards/jwt.guard';

/**
 * Controlador que expone endpoints para la gestión de registros,
 * detección de anomalías y resumen por zona.
 * Protegido por JWT y API Key.
 */
@Controller()
@UseGuards(JwtGuard, ApiKeyGuard)
export class RecordsController {
  constructor(
    private readonly createRecord: CreateRecordUseCase,
    private readonly detectAnomalies: AnomalyDetectorService,
    private readonly sumamryZone: SummaryZoneService
  ) { }

  /**
 * Crea un nuevo registro de temperatura.
 *
 * @param {CreateRecordDto} dto - Objeto con los datos del nuevo registro.
 * @returns {{ message: string }} Mensaje de éxito.
 *
 * @example
 * POST /records
 * {
 *   "zone": "Norte",
 *   "timestamp": "2025-08-01T14:30:00Z",
 *   "temperature": 28.5
 * }
 */
  @Post('records')
  create(@Body() dto: CreateRecordDto) {
    this.createRecord.execute(dto.zone, dto.timestamp, dto.temperature);
    return { message: 'Record saved successfully' };
  }

  /**
 * Obtiene todos los registros almacenados.
 *
 * @returns {Record[]} Lista de registros.
 */
  @Get('records')
  findAll() {
    return this.createRecord.getAll()
  }

  /**
 * Retorna las secuencias de anomalías detectadas para una zona específica.
 *
 * @param {string} zone - Nombre de la zona.
 * @returns {Record[][]} Arreglo de secuencias de registros anómalos.
 *
 * @example
 * GET /zones/Norte/anomalies
 */
  @Get('zones/:zone/anomalies')
  getAnomalies(@Param('zone') zone: string) {
    const records = this.createRecord.getAll();
    const zoneRecords = records.filter(r => r.zone === zone);
    const anomalies = this.detectAnomalies.detect(zoneRecords)
    return anomalies;
  }

  /**
 * Retorna un resumen estadístico (mínimo, máximo, promedio) de una zona específica.
 *
 * @param {string} zone - Nombre de la zona.
 * @returns {{
 *   zone: string,
 *   averageTemperature: number,
 *   minTemperature: number,
 *   maxTemperature: number,
 *   recordsCount: number
 * } | null} Resumen de la zona o null si no hay registros.
 *
 * @example
 * GET /zones/Norte/summary
 */
  @Get('zones/:zone/summary')
  getSumary(@Param('zone') zone: string) {
    const records = this.createRecord.getAll();
    const zoneRecords = records.filter(r => r.zone === zone);
    const summary = this.sumamryZone.summary(zoneRecords);
    return summary
  }
}

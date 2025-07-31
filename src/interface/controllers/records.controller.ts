import {
  Controller,
  Post,
  Body,
  UseGuards,
  Get,
  Param,
} from '@nestjs/common';
import { CreateRecordDto } from '../../application/dto/create-record.dto';
import { CreateRecordUseCase } from '../../application/use-cases/create-record.usecase';
import { GetRecordsUseCase } from '../../application/use-cases/get-records.usecase';
import { AnomalyDetectorService } from "../../domain/services/anomaly-detector.service";
import { ApiKeyGuard } from '../../infrastructure/guards/api-key.guard';
import { JwtGuard } from '../../infrastructure/guards/jwt.guard';

@Controller()
@UseGuards(JwtGuard, ApiKeyGuard)
export class RecordsController {
  constructor(
    private readonly createRecord: CreateRecordUseCase,
    private readonly getRecords: GetRecordsUseCase,
    private readonly detectAnomalies: AnomalyDetectorService
  ) {}

  @Post('records')
  create(@Body() dto: CreateRecordDto) {
    this.createRecord.execute(dto.zone, dto.timestamp, dto.temperature);
    return { message: 'Record saved successfully' };
  }

  @Get('records')
  findAll(){
    return this.getRecords.execute()
  }

   @Get('zones/:zone/anomalies')
  getAnomalies(@Param('zone') zone: string) {
    const records = this.createRecord.getAll();
    const zoneRecords = records.filter(r => r.zone === zone);
    const anomalies = this.detectAnomalies.detect(zoneRecords)
    return anomalies;


}
}

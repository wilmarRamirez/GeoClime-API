/* import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordsModule } from './records/records.module';
import { Record } from './domain/entities/record.entity';
import { ConfigModule } from '@nestjs/config';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ ConfigModule.forRoot({ isGlobal: true }),  TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'data/db.sqlite', // archivo que se creará
      entities: [Record],
      synchronize: true, // genera tablas automáticamente en desarrollo
    }), RecordsModule, AuthModule],
  controllers: [ AuthController],
  providers: [],
})
export class AppModule {} */

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MemoryRecordsRepository } from "./infrastructure/repositories/memory-records.repository";
import { AuthModule } from './auth/auth.module';
import { AuthController } from './auth/auth.controller';
import { AnomalyDetectorService } from "./domain/services/anomaly-detector.service";
import { RecordsController } from "./interface/controllers/records.controller";
import { CreateRecordUseCase } from "./application/use-cases/create-record.usecase";
import { GetRecordsUseCase } from "./application/use-cases/get-records.usecase";
import { DetectAnomaliesUseCase } from "./application/use-cases/detect-anomalies.usecase";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    AuthModule
  ],
  controllers: [AuthController, RecordsController],
  providers:[
    AnomalyDetectorService, 
    MemoryRecordsRepository, 
    CreateRecordUseCase, 
    GetRecordsUseCase, 
    DetectAnomaliesUseCase]
})
export class AppModule {}

/* import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RecordsService } from './records.service';
import { RecordsController } from './records.controller';
import { Record } from '../domain/entities/record.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Record])],
  controllers: [RecordsController],
  providers: [RecordsService],
})
export class RecordsModule {}
 */
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './domain/services/auth.service';
import { JwtStrategy } from './infrastructure/auth/strategy/jwt.strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MemoryRecordsRepository } from "./infrastructure/repositories/memoryRecords.repository";
import { AuthController } from './interface/controllers/auth.controller';
import { AnomalyDetectorService } from "./domain/services/anomalyDetector.service";
import { SummaryZoneService } from "./domain/services/summaryZone.service";
import { RecordsController } from "./interface/controllers/records.controller";
import { CreateRecordUseCase } from "./application/use-cases/createRecord.usecase";
import { DetectAnomaliesUseCase } from "./application/use-cases/detectAnomalies.usecase";

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: {
          expiresIn: configService.get<string>('JWT_EXPIRES') || '1h',
        },
      }),
    }),
  ],
  controllers: [AuthController, RecordsController],
  providers: [
    AuthService,
    JwtStrategy,
    AnomalyDetectorService,
    SummaryZoneService,
    MemoryRecordsRepository,
    CreateRecordUseCase,
    DetectAnomaliesUseCase
  ],
  exports: [AuthService],
})
export class AppModule { }

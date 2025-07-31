import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppService } from './app.service';
import { RecordsController } from './controller/records.controller';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule],
  controllers: [RecordsController, AuthController],
  providers: [AppService],
})
export class AppModule {}

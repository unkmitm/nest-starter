import { Global, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformResponseInterceptor } from './interceptors/transform-response/transform-response.interceptor';
import config from 'src/config';
import { LoggerService } from 'src/logger/logger.service';

// Global Options
@Global()
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // همه جا در دسترس باشه
      load: [config], // همه جا کانفیگ فایل به صورت root پخش شه
    }),
  ],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformResponseInterceptor,
    },
    LoggerService,
  ],
  exports: [LoggerService],
})
export class CoreModule {}

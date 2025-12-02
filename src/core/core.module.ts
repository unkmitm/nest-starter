import { Global, MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformResponseInterceptor } from './interceptors/transform-response/transform-response.interceptor';
import config from 'src/config';
import { LoggerService } from 'src/logger/logger.service';
import { LoggerMiddleware } from './middleware/logger/logger.middleware';

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
// فعال کردن میدلویر
export class CoreModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}

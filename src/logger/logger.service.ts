import { Injectable, LoggerService as NestLogger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as winston from 'winston';

@Injectable()
export class LoggerService implements NestLogger {
  private logger: winston.Logger;

  constructor(private readonly configService: ConfigService) {
    const isDevelopment =
      this.configService.getOrThrow<string>('NODE_ENV') === 'development';
    const { combine, timestamp, json, colorize, printf } = winston.format;

    const logFormat = isDevelopment
      ? combine(
          timestamp(),
          colorize(),
          printf(({ level, message, context, meta }) => {
            return `${level} [${context}] ${message} ${meta ? JSON.stringify(meta) : ''}`;
          }),
        )
      : combine(timestamp(), json());

    this.logger = winston.createLogger({
      level: 'info',
      format: logFormat,
      transports: [new winston.transports.Console()],
    });
  }

  log(message: string, context?: string, meta?: any) {
    this.logger.info(message, { context, meta });
  }

  error(message: string, trace?: string, context?: string, meta?: any) {
    this.logger.error(message, { trace, context, ...meta });
  }

  warn(message: string, context?: string, meta?: any) {
    this.logger.warn(message, { context, ...meta });
  }
}

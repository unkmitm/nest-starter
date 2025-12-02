import { Injectable, LoggerService as NestLogger } from '@nestjs/common';
import * as winston from 'winston';

@Injectable()
export class LoggerService implements NestLogger {
  private logger: winston.Logger;

  constructor() {
    this.logger = winston.createLogger({
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
      ),
      transports: [new winston.transports.Console()],
    });
  }
  log(message: string) {
    this.logger.info(message);
  }
  error(message: string) {
    console.error(message);
  }
  warn(message: string) {
    console.warn(message);
  }
}

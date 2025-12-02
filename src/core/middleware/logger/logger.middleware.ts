import { Injectable, NestMiddleware } from '@nestjs/common';
import { LoggerService } from 'src/logger/logger.service';
import { Request, Response } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  constructor(private readonly logger: LoggerService) {}
  use(req: Request, res: Response, next: () => void) {
    res.on('finish', () => {
      const { statusCode } = res;
      const { url, method } = req;
      const logData = {
        url,
        method,
      };
      const logMessage = `${method} ${url}`;
      if (statusCode === 500) {
        this.logger.error(`${logMessage}`, `HTTP`, `500 error`);
      } else if (statusCode >= 400) {
        this.logger.warn(logMessage, `Request failed`, `400 error`);
      } else {
        this.logger.log(logMessage, `Request Processd!`, logData);
      }
    });
    next();
  }
}

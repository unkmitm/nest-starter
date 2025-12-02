import { Injectable } from '@nestjs/common';
import { LoggerService } from './logger/logger.service';

@Injectable()
export class AppService {
  private context = 'AppService';
  constructor(private readonly logger: LoggerService) {}

  getHello(): any {
    this.logger.log('Message Recived', this.context, {
      userId: 1,
      isPremium: true,
    });
    return `${this.context}`;
  }
}

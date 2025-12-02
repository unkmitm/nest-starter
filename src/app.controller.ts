import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Post,
} from '@nestjs/common';
import { AppService } from './app.service';
import { CreateUserDto } from './create-user.dto';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post()
  createUser(@Body() payload: CreateUserDto) {
    if (!payload.email) throw new BadRequestException();
    // درست بودن ایمیل رو چک کن . حتما باید ایمیل باشه
    return payload;
  }
}

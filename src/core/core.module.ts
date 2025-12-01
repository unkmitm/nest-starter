import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import config from 'src/config';

// Global Options
@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // همه جا در دسترس باشه
      load: [config], // همه جا کانفیگ فایل به صورت root پخش شه
    }),
  ],
})
export class CoreModule {}

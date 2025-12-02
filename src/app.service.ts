import { Injectable } from '@nestjs/common';
// import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  // constructor(private readonly configService: ConfigService) {}

  getHello(): any {
    // const enviromentVariable = this.configService.get<string>('enviroment');
    // console.log(enviromentVariable);

    return {
      data: 'Hello World',
      meta: {
        pages: 10,
      },
    };
  }
}

import { Controller, Get, Post, Put, Delete} from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {  //controller - определяют логику обработки запросов с клиента на сервер и наоборот
  constructor(private readonly appService: AppService) {}

  @Get()  // с помощью декораторов определяет методы запросов
  getHello(): string {
    return this.appService.getHello();
  }

  @Post()
  sendAll(): string {
    return "post data"
  }

  @Put()
  update(): string {
    return "put data"
  }

  @Delete()
  delete(): string {
    return "delete data"
  }
}

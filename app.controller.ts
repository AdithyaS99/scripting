import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AppService } from './app.service';

export const arr: number[]=[1,2,3,4,5]

@Controller()
export class AppController {

  //public arr: number[]=[1,2,3,4,5];

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello():string{
    return "Hello World!";
  }
  
  @Get()
  get(): string {
    return "GET request called, array : ".concat(arr.toString());
  }

  @Post()
  post(): string {
    return "Please specify index or number";
  }

  @Delete()
  delete(): string{
    arr.pop();
    return "DELETE Request Called, updated array : ".concat(arr.toString());
  }

  @Put()
  put(@Body() body: MessageBody): string{
    arr.push(body.num);
    return "PUT Request Called, element added to array : ".concat(arr.toString());
  }
}

export interface MessageBody
{
  num: number
}
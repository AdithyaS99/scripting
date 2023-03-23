import { Controller, Get, Param, Post, Body, Delete, Put } from '@nestjs/common';
import { AppService } from './app.service';
import {arr} from './app.controller';

@Controller('/index')
export class IndexController {

    path: "/index";
  //protected arr: number[]=[1,2,3,4,5];

  constructor(private readonly appService: AppService) {}

  @Get('/')
  get():string{
    return "working";
  }

  @Get('/:ind')
  getIndex(@Param('ind') ind: number): string {
    return "GET request called, number at index is : ".concat(arr[ind].toString());
  }

  @Post('/')
  modifyArray(@Body() body: IndexBody): string {
    if(body.ind>-1)
    {
        arr[body.ind]=parseInt(body.val.toString(),10);
        return "POST Request by index Called\n modified array : ".concat(arr.toString());
    }
    else
    {
        return "POST Request by index Called\n element not found. array : ".concat(arr.toString());
    }
    
  }

  @Delete('/:ind')
  deleteElement(@Param('ind') ind:number):string{
    if(ind>-1)
    {
        arr.splice(ind,1);
        return "DELETE Request by index Called\n modified array : ".concat(arr.toString())
    }
    else
    {
        return "DELETE Request by index Called\n element not found.\n modified array : ".concat(arr.toString());
    }
  }

  @Put('/:ind')
  addElement(@Body() body: IndexBody):string{
    arr.splice(body.ind, 0, body.val);
    return "PUT Request Called, element added to array : ".concat(arr.toString());
  }
}

export interface IndexBody{
    ind: number;
    val: number
}

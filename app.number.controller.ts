import { Controller, Get, Param, Post, Body, Delete, Put } from '@nestjs/common';
import { AppService } from './app.service';
import {arr} from './app.controller';

@Controller('/number')
export class NumberController {

    path: "/number";
  //protected arr: number[]=[1,2,3,4,5];

  constructor(private readonly appService: AppService) {}

  @Get('/')
  get():string{
    return "working";
  }

  @Get('/:num')
  getIndex(@Param('num') num: number): string {
    var index : number;
    index=arr.indexOf(parseInt(num.toString(),10));
    return "GET request called, index of number is : ".concat(index.toString());
  }

  @Post('/')
  modifyArray(@Body() body: NumberBody): string {
    var index: number = arr.indexOf(parseInt(body.num.toString(),10));
    if(index>-1)
    {
        arr[index]=parseInt(body.val.toString(),10);
        return "POST Request by number Called\n modified array : ".concat(arr.toString());
    }
    else
    {
        return "POST Request by number Called\n element not found. array : ".concat(arr.toString());
    }
    
  }

  @Delete('/:num')
  deleteElement(@Param('num') num:number):string{
    var index:number = arr.indexOf(parseInt(num.toString(),10));
    if(index>-1)
    {
        arr.splice(index,1);
        return "DELETE Request by number Called\n modified array : ".concat(arr.toString())
    }
    else
    {
        return "DELETE Request by number Called\n element not found.\n modified array : ".concat(arr.toString());
    }
  }

  @Put('/:num')
  addElement(@Param('num') num:number):string{
    arr.push(parseInt(num.toString(),10));
    return "PUT Request Called, element added to array at index: ".concat(arr.toString());
  }
}

export interface NumberBody{
    num: number;
    val: number
}

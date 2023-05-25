import { Controller, Get, Param, Post, Delete, UseGuards } from '@nestjs/common';
import { ITour } from 'src/interfaces/tours';
import { JwtAuthGuardService } from 'src/services/Authentication/jwt-auth.guard/jwt-auth.guard.service';
import { ToursService } from 'src/services/tours/tours.service';


@Controller('tours')
export class ToursController {
    constructor (private toursService: ToursService){
    }
    @Post()
    initTours(): Promise<ITour[]> {
        return this.toursService.generateTours();  // для записи в БД
           // возвращает туры
    }

    @UseGuards(JwtAuthGuardService)
    @Get()
    getAllTours(): Promise<ITour[]> {
        return this.toursService.getAllTours()
    }

    @UseGuards(JwtAuthGuardService)
    @Get(":_id")
    getTourById(@Param("_id")_id):Promise<ITour>{
        return this.toursService.getTourById(_id);
    }

    @Delete()
    removeAllTours(): void {
       this.toursService.deleteTours();
    }
    
}


/* @Get()
        getAllTours():void{
            this.toursService.generateTours();
        }

        @Get(":remove")
        removeAllTours(@Param('remove') remove): void {
            this.toursService.deleteTours();
        } */
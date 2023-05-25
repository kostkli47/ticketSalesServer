import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { ITourClient } from 'src/interfaces/tours';
import { ToursService } from 'src/services/tours/tours.service';


@Controller('tour-item')
export class TourItemController {
    constructor(private toursService: ToursService){
    }
    static imgName: string;

    @Post()
    @UseInterceptors(FileInterceptor('img', {
        storage: diskStorage({
            destination: './public/',
            filename: (req, file, cb) => {
                const imgType = file.mimetype.split('/') // mimetype - свойство объекта files, которое приходит с клиента
                const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
                const imgName = file.fieldname + '-' + uniqueSuffix+'.'+imgType[1]
                cb(null, imgName);
                TourItemController.imgName = imgName; // запись нашего имени файла  в статичное свойство imgname
            }
        })
    })
    )

    initTours(@Body()body:ITourClient):void {
        body.img = TourItemController.imgName;
        this.toursService.uploadTour(body);
    }
} 

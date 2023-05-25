import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TourDto } from 'src/dto/tour-dto';
import { ITour, ITourClient } from 'src/interfaces/tours';
import { TourDocument } from 'src/shemas/tour';
import { Tour } from 'src/shemas/tour';


@Injectable()
export class ToursService {
    private toursCount = 10;

    constructor(@InjectModel(Tour.name) private tourModel: Model<TourDocument>){  // для записи данных в БД
    }

    async generateTours(): Promise<any> {
        for (let i = 0; i <= this.toursCount; i++){
            const tour = new TourDto('test'+i,'test desc','test operator','300'+i, 'img')
            const tourData = new this.tourModel(tour);
            await tourData.save();
        }
        return this.getAllTours()
    }

    async deleteTours(): Promise<any> {
       return this.tourModel.deleteMany({})
    }

    async getAllTours(): Promise<ITour[]> {
        return this.tourModel.find()
    }

    async getTourById(id):Promise<ITour> {
        return this.tourModel.findById(id);
    }
    
    async uploadTour(body:ITourClient) {
        const tour = new TourDto(body.name, body.description, body.tourOperator, body.price, body.img);
        const tourData = new this.tourModel(tour);
        await tourData.save();
    }
}

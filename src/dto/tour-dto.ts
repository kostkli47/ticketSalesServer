import { ITour } from "src/interfaces/tours";
// dto - спец файлы, которые описывают данные, которые будут записываться в БД

export class TourDto implements ITour {
    name:string;
    description:string;
    tourOperator:string;
    price:string;
    img:string;
    id:string;
    type: string;
    date: string;

    constructor(name, description, tourOperator, price, img){
        this.name = name;
        this.description = description;
        this.tourOperator = tourOperator;
        this.price = price;
        this.img = img;
    }
}
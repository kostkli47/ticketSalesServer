import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderDto } from 'src/dto/order-dto';
import { Order, OrderDocument } from 'src/shemas/order';
import { Tour } from 'src/shemas/tour';

@Injectable()
export class OrderService {
    constructor (@InjectModel(Order.name) private orderModel: Model<OrderDocument>){}

    async sendOrder(data: OrderDto): Promise<Order> {
        const orderData = new this.orderModel(data);
        return orderData.save();
    }

    async getOrders(userId: string): Promise<Order[]> {
        return this.orderModel.find({"userId":userId})};
    

    async getOrdersById(_id): Promise<Order> {
        return this.orderModel.findById(_id);
    }
}

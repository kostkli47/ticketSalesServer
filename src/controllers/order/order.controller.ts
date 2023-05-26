import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrderDto } from 'src/dto/order-dto';
import { OrderService } from 'src/services/order/order.service';
import { Order } from 'src/shemas/order';
import { Tour } from 'src/shemas/tour';

@Controller('order')
export class OrderController {

    constructor (private orderService:OrderService){}

    @Post()   // обрабатываем пост запрос на эндпоинт ордер и записываем наше значение в БД
    initTours(@Body() data:OrderDto): void{
        const orderData = new OrderDto(data.age, data.birthDay, data.cardNumber, data.tourId, data.userId);
        this.orderService.sendOrder(orderData);
    }

    @Get(":userId")
    getOrders(@Param("userId") userId): Promise<Order[]> {
        return this.orderService.getOrders(userId);
    }

/*     @Get(":id")
    getOrdersById(@Param('id')id):Promise<Order> {
        return this.orderService.getOrdersById(id);
    } */

}

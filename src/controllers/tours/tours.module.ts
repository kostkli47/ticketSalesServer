import { Module } from '@nestjs/common';
import { Tour, TourSchema } from 'src/shemas/tour';
import { ToursController } from './tours.controller';
import { ToursService } from 'src/services/tours/tours.service';
import { JwtStrategyService } from 'src/services/Authentication/jwt-strategy/jwt-strategy.service';
import { MongooseModule } from '@nestjs/mongoose';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from 'src/static/private/constants';
import { TourItemController } from '../tour-item/tour-item.controller';

@Module({
    imports: [MongooseModule.forFeature([{name:Tour.name, schema: TourSchema}]),
      PassportModule,
      JwtModule.register({
        secret: jwtConstants.secret,

      }),],
  controllers: [ToursController, TourItemController],
  providers: [ToursService, JwtStrategyService],
})
export class ToursModule {}
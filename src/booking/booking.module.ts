// booking.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingService } from './booking.service';
import { BookingController } from './booking.controller';
import { Booking } from '../model/booking.entity';
import { Resource } from '../model/resource.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Booking, Resource])],
  providers: [BookingService],
  controllers: [BookingController],
  exports: []
})
export class BookingModule { }
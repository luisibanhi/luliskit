// availability.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectService } from '../project/project.service';
import { Project } from '../model/project.entity';
import { Resource } from '../model/resource.entity';
import { AvailabilityController } from './availability.controller';
import { BookingService } from '../booking/booking.service';
import { Booking } from '../model/booking.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Resource, Booking])],
  providers: [ProjectService, BookingService],
  controllers: [AvailabilityController],
  exports: []
})
export class AvailabilityModule { }
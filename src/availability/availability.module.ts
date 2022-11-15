// availability.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectService } from '../project/project.service';
import { Project } from '../model/project.entity';
import { Resource } from '../model/resource.entity';
import { AvailabilityController } from './availability.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Resource])],
  providers: [ProjectService],
  controllers: [AvailabilityController],
  exports: []
})
export class AvailabilityModule { }
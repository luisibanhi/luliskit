// resource.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourceService } from './resource.service';
import { ResourceController } from './resource.controller';
import { Resource } from '../model/resource.entity';
import { AvailabilityConstraints } from '../model/availability_constraints.entity';
import { Project } from '../model/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Resource, AvailabilityConstraints, Project])],
  providers: [ResourceService],
  controllers: [ResourceController],
  exports: []
})
export class ResourceModule { }
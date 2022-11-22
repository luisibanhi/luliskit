// resource.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ResourceService } from './resource.service';
import { ResourceController } from './resource.controller';
import { Resource } from '../model/resource.entity';
import { Project } from '../model/project.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Resource, Project])],
  providers: [ResourceService],
  controllers: [ResourceController],
  exports: []
})
export class ResourceModule { }
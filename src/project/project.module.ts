// project.module.ts

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProjectService } from './project.service';
import { ProjectController } from './Project.controller';
import { Project } from '../model/project.entity';
import { Resource } from '../model/resource.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Project, Resource])],
  providers: [ProjectService],
  controllers: [ProjectController],
  exports: []
})
export class ProjectModule { }
import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProjectDTO } from './project.dto';
import { ProjectService } from './project.service';

@Controller('project')
export class ProjectController {
  constructor(private serv: ProjectService) {}
  @Post()
  public async create(@Body() dto: ProjectDTO): Promise<ProjectDTO> {
    return await this.serv.create(dto);
  }

  @Get()
  public async getAll(): Promise<ProjectDTO[]> {
    return await this.serv.getAll();
  }
}

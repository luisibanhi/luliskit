import { Body, Controller, Get, Post } from '@nestjs/common';
import { ResourceDTO } from './resource.dto';
import { ResourceService } from './resource.service';

@Controller('resource')
export class ResourceController {
  constructor(private serv: ResourceService) {}
  @Post()
  public async create(@Body() dto: ResourceDTO): Promise<ResourceDTO> {
    return await this.serv.create(dto);
  }

  @Get()
  public async getAll(): Promise<ResourceDTO[]> {
    return await this.serv.getAll();
  }
}

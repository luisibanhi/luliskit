import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
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

  @Put(':id')
  public async update(@Param('id') id: string, @Body() updateUserDto: ResourceDTO) {
    return this.serv.update(id, updateUserDto);
  }
}

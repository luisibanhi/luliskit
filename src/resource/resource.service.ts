import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Resource } from '../model/resource.entity';
import { ResourceDTO } from './resource.dto';

@Injectable()
export class ResourceService {
  constructor(@InjectRepository(Resource) private readonly repo: Repository<Resource>) {}

  public async getAll(): Promise<ResourceDTO[]> {
    return await this.repo.find()
      .then(resource => resource.map(e => ResourceDTO.fromEntity(e)));
  }

  public async create(dto: ResourceDTO): Promise<ResourceDTO> {
    return this.repo.save(ResourceDTO.toEntity(dto))
      .then(e => ResourceDTO.fromEntity(e));
  }

}

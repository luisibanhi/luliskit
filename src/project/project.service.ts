import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from '../model/project.entity';
import { ProjectDTO } from './project.dto';

@Injectable()
export class ProjectService {
  constructor(@InjectRepository(Project) private readonly repo: Repository<Project>) {}

  public async getAll(): Promise<ProjectDTO[]> {
    return await this.repo.find({
      relations: {
        resources: true,
      },
    }).then(resource => resource.map(e => ProjectDTO.fromEntity(e)));
  }

  public async findBy(id: string): Promise<ProjectDTO> {
    return await this.repo.findOneBy({ id }).then(resource => ProjectDTO.fromEntity(resource));
  }


  public async create(dto: ProjectDTO): Promise<ProjectDTO> {
    return this.repo.save(ProjectDTO.toEntity(dto))
      .then(e => {
        return ProjectDTO.fromEntity(e);
      });
  }
  
}
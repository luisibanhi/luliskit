import { BadRequestException, Injectable } from '@nestjs/common';
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
    return await this.repo.findOneBy({ id, isActive: true }).then(resource => ProjectDTO.fromEntity(resource));
  }

  public async create(dto: ProjectDTO): Promise<ProjectDTO> {
    return this.repo.save(ProjectDTO.toEntity(dto))
      .then(e => {
        return ProjectDTO.fromEntity(e);
      });
  }
  
  public async findProjectWithResource(pId: string, rId: string): Promise<any> {
    const body = await this.repo.manager.query(`SELECT p.duration, p.workdays_default, p."minSlotDays", r.id, r.name, r.timezone, r.availability_constraints FROM project p JOIN project_resources_resource prr ON prr."projectId"=p.id JOIN resource r ON prr."resourceId"=r.id WHERE p.id = '${pId}' AND r.id = '${rId}' AND p."isActive" = true AND r."isActive" = true;`);
    if (!body?.length) throw new BadRequestException("Project ID or Resource ID not related");

    return body;
  }
}
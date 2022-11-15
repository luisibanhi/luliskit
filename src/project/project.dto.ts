import { IsArray, IsJSON, IsNumber, IsString, IsUUID, } from 'class-validator';
import { v4 } from 'uuid';
import { DateTime } from 'luxon';
import { Project } from '../model/project.entity';
import { AvailabilityWorkdays } from '../model/availability_constraints.entity';
import { Resource } from '../model/resource.entity';

export class ProjectDTO implements Readonly<ProjectDTO> {

  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsNumber()
  duration: number;

  @IsJSON()
  workdays_default: AvailabilityWorkdays[];

  @IsArray()
  resources: Resource[]

  public static from(dto: Partial<ProjectDTO>) {
    const r = new ProjectDTO();
    r.id = dto.id;
    r.name = dto.name;
    r.duration = dto.duration;
    r.workdays_default = dto.workdays_default;
    r.resources = dto.resources;
    return r;
  }

  public static fromEntity(entity: Project) {
    return this.from({
      id: entity.id,
      name: entity.name,
      duration: entity.duration,
      workdays_default: entity.workdays_default,
      resources: entity.resources,
    });
  }

  public static toEntity(dto: Partial<ProjectDTO>) {
    const r = new Project();
    r.id = v4();
    r.name = dto.name;
    r.duration = dto.duration;
    r.workdays_default = dto.workdays_default;
    r.created_at = DateTime.utc().toJSDate();
    r.updated_at = DateTime.utc().toJSDate();
    // @ts-ignore
    r.resources = dto.resources.map((item: Resource) => ({ id: item }));
    r.createdBy = "";
    return r;
  }
}
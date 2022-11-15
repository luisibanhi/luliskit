// project.entity.ts
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { AvailabilityWorkdays } from './availability_constraints.entity';
import { BaseEntity } from './base.entity';
import Resource from './resource.entity';

const WorkdayDefault: AvailabilityWorkdays[] = [
  {
    day: "Monday",
    from: "12:00",
    to: "20:00"
  },
  {
    day: "Tuesday",
    from: "12:00",
    to: "20:00"
  },
  {
    day: "Wednesday",
    from: "12:00",
    to: "20:00"
  },
  {
    day: "Thursday",
    from: "12:00",
    to: "20:00"
  },
  {
    day: "Friday",
    from: "12:00",
    to: "20:00"
  }
]

@Entity({ name: 'project' })
export class Project extends BaseEntity {
  @Column({ type: 'varchar', length: 300 })
  name: string;

  @Column({ type: 'json', default: WorkdayDefault })
  workdays_default: AvailabilityWorkdays[];

  @Column({ type: 'int', default: 60 })
  duration: number;

  @ManyToMany((type: any) => Resource, (resource: Resource) => resource.projects)
  @JoinTable()
  resources: Resource[];
}

export default Project;

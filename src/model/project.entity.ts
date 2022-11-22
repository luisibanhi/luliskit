// project.entity.ts
import { InputSlot } from 'slot-calculator';
import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from './base.entity';
import Resource from './resource.entity';

const WorkdayDefault: InputSlot[] = [
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
  workdays_default: InputSlot[];

  @Column({ type: 'int', default: 60 })
  duration: number;

  @Column({ type: 'int', default: 60 })
  minSlotDays: number;

  @ManyToMany(() => Resource, (resource: Resource) => resource.projects)
  @JoinTable()
  resources: Resource[];
}

export default Project;

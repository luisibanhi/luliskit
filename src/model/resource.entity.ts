// resource.entity.ts
import { Entity, Column, ManyToMany } from 'typeorm';
import { InputSlot } from 'slot-calculator';
import { BaseEntity } from './base.entity';
import { Project } from './project.entity';

export interface Constraints {
  blocks?: InputSlot[];
  allow?: InputSlot[];
}

@Entity({ name: 'resource' })
export class Resource extends BaseEntity {
  @Column({ type: 'varchar', length: 300, unique: true })
  email?: string;

  @Column({ type: 'varchar', length: 300 })
  first_name?: string;

  @Column({ type: 'varchar', length: 300 })
  last_name?: string;

  @Column({ type: 'varchar', length: 300 })
  name?: string;

  @Column({ type: 'varchar', length: 300 })
  timezone?: string;

  @Column({ type: 'json', nullable: true })
  availability_constraints?: Constraints;

  @ManyToMany(() => Project, (project: Project) => project.resources)
  projects: Project[]
}

export default Resource;

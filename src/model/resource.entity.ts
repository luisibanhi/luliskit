// resource.entity.ts
import { Entity, Column, OneToOne, ManyToMany, JoinTable } from 'typeorm';
import { AvailabilityConstraints } from './availability_constraints.entity';
import { BaseEntity } from './base.entity';
import Project from './project.entity';

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

  @OneToOne(type => AvailabilityConstraints, av => av.id)
  availability_constraints?: AvailabilityConstraints;

  @ManyToMany((type: any) => Project, (project: Project) => project.resources)
  projects: Project[]
}

export default Resource;

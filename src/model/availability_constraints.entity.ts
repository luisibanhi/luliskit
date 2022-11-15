// availability_constraints.entity.ts
import { Entity, Column } from 'typeorm';
import { BaseEntity } from './base.entity';

@Entity({ name: 'availability_constraints' })
export class AvailabilityConstraints extends BaseEntity {
  @Column({ type: 'json' })
  data: string;
}

export interface AvailabilityWorkdays {
  day: string;
  from: string;
  to: string;
}

export default AvailabilityConstraints;

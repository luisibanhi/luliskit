import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "./base.entity";
import { Resource } from "./resource.entity";

export interface User {
  id: string;
  name: string;
  image: string;
  email: string;
  timezone: string;
  cognito_id: string;
}

export enum BookingStatus {
  CONFIRMED = "confirmed",
  COMPLETED = "completed",
  CANCELLED = "cancelled",
  CANCELLED_BY_CUSTOMER = "cancelled_by_customer",
}

@Entity({ name: 'booking' })
@Index(['start', 'resource'], { unique: true })
export class Booking extends BaseEntity {
  @Column({
    type: "enum",
    enum: BookingStatus,
    default: BookingStatus.CONFIRMED
  })
  state: BookingStatus;

  @Column({ type: 'json' })
  user: User;

  @ManyToOne(() => Resource, {})
  @JoinColumn({
    name: 'resource_id',
    referencedColumnName: 'id',
    foreignKeyConstraintName: 'booking_resource_fk'
  })
  resource: Resource

  @CreateDateColumn({ type: 'timestamptz' })
  start: Date;

  @CreateDateColumn({ type: 'timestamptz' })
  end: Date;
}

export default Booking;
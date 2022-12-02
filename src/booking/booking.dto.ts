import { IsBoolean, IsDate, IsEnum, IsJSON, IsString, IsUUID } from 'class-validator';
import { v4 } from 'uuid';
import { DateTime } from 'luxon';
import { Booking, BookingStatus, User } from '../model/booking.entity';
import { Resource } from '../model/resource.entity';
import { InputSlot } from 'slot-calculator';

export interface Event {
  calendar_id?: string;
  start: Date;
  end: Date;
}

export interface Attributes {
  customer: User;
  event: Event;
}

export enum Action {
  Cancel = 'cancel',
  CancelByCustomer = 'cancel_by_customer'
}

export const ActionToBookingStatus = {
  [Action.Cancel]: BookingStatus.CANCELLED,
  [Action.CancelByCustomer]: BookingStatus.CANCELLED_BY_CUSTOMER
}

export class BookingDTO implements Readonly<BookingDTO> {

  @IsUUID()
  id: string;

  @IsEnum(BookingStatus)
  state: BookingStatus;

  @IsBoolean()
  completed: boolean;

  @IsJSON()
  blocked_week: object;

  @IsJSON()
  event: Event

  @IsJSON()
  customer: User;

  @IsJSON()
  attributes: Attributes

  @IsDate()
  start: Date;

  @IsDate()
  end: Date;

  @IsString()
  resource_id: Resource;

  public static from(dto: Partial<BookingDTO>) {
    const r = new BookingDTO();
    r.id = dto.id;
    r.state = dto.state;
    r.attributes = dto.attributes;
    r.event = dto.event;
    r.customer = dto.customer;
    r.resource_id = dto.resource_id;
    r.completed = dto.completed;
    return r;
  }

  public static fromEntity(entity: Booking) {
    const event = {
      calendar_id: v4(),
      start: entity.start,
      end: entity.end,
    }

    return this.from({
      id: entity.id,
      state: entity.state,
      completed: entity.state === BookingStatus.COMPLETED,
      blocked_week: {},
      event,
      customer: entity.user,
      attributes: {
        customer: entity.user,
        event
      },
      resource_id: entity.resource,
    });
  }

  public static toEntity(dto: Partial<BookingDTO>) {
    const r = new Booking();
    r.id = v4();
    r.user = dto.customer;
    r.start = dto.start;
    r.end = dto.end;
    r.created_at = DateTime.utc().toJSDate();
    r.updated_at = DateTime.utc().toJSDate();
    r.resource = dto.resource_id;
    r.createdBy = "";
    return r;
  }

  public static toFilterAvailability(entity: Booking): InputSlot {
    return ({
      from: entity.start.toISOString(),
      to: entity.end.toISOString(),
    })
  }

  public static convertActionToBookingStatus(action: Action) {
    return ActionToBookingStatus[action];
  }
}
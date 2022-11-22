import { IsArray, IsString, IsUUID, } from 'class-validator';
import { v4 } from 'uuid';
import { DateTime } from 'luxon';
import { Constraints, Resource } from '../model/resource.entity';
import { AvailabilityDTO } from '../availability/availability.dto';

export interface ConstraintsRequest {
  allow_period: {
    start: string;
    end: string;
  }
  block_period: {
    start: string;
    end: string;
  }
  allow_day_and_time: {
    day: string;
    start: string;
    end: string;
  }
}

export class ResourceDTO implements Readonly<ResourceDTO> {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  timezone: string;

  @IsArray()
  availability_constraints: Constraints | ConstraintsRequest[];

  public static from(dto: Partial<ResourceDTO>) {
    const r = new ResourceDTO();
    r.id = dto.id;
    r.name = dto.name;
    r.email = dto.email;
    r.timezone = dto.timezone;
    r.availability_constraints = dto.availability_constraints;
    return r;
  }

  public static fromEntity(entity: Resource) {
    return this.from({
      id: entity.id,
      name: entity.name,
      email: entity.email,
      timezone: entity.timezone,
      availability_constraints: AvailabilityDTO.formatToConstrainsRequest(entity?.availability_constraints)
    });
  }

  public static toEntity(dto: Partial<ResourceDTO>) {
    const nameSplitted = dto?.name?.split(' ');

    const r = new Resource();
    r.id = dto.id || v4();
    r.email = dto.email;
    r.name = dto.name;
    r.timezone = dto.timezone;
    r.first_name = nameSplitted?.[0];
    r.last_name = nameSplitted?.[nameSplitted.length - 1] || '';
    r.availability_constraints = AvailabilityDTO.formatConstrains(dto.availability_constraints as ConstraintsRequest[])
    r.created_at = DateTime.utc().toJSDate();
    r.updated_at = DateTime.utc().toJSDate();
    r.createdBy = "";
    return r;
  }
}
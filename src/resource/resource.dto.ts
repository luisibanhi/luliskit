import { IsString, IsUUID, } from 'class-validator';
import { v4 } from 'uuid';
import { DateTime } from 'luxon';
import { Resource } from '../model/resource.entity';

export class ResourceDTO implements Readonly<ResourceDTO> {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsString()
  email: string;

  @IsString()
  timezone: string;

  public static from(dto: Partial<ResourceDTO>) {
    const r = new ResourceDTO();
    r.id = dto.id;
    r.name = dto.name;
    r.email = dto.email;
    r.timezone = dto.timezone;
    return r;
  }

  public static fromEntity(entity: Resource) {
    return this.from({
      id: entity.id,
      name: entity.name,
      email: entity.email,
      timezone: entity.timezone
    });
  }

  public static toEntity(dto: Partial<ResourceDTO>) {
    const r = new Resource();
    r.id = v4();
    r.email = dto.email;
    r.name = dto.name;
    r.timezone = dto.timezone;
    r.first_name = dto?.name?.split(' ')?.[0];
    r.last_name = dto?.name?.split(' ')?.[1];
    r.created_at = DateTime.utc().toJSDate();
    r.updated_at = DateTime.utc().toJSDate();
    r.createdBy = "";
    return r;
  }
}
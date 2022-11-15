import { IsString, IsUUID, } from 'class-validator';
import { OutputSlot } from "slot-calculator"

export class AvailabilityDTO implements Readonly<AvailabilityDTO> {
  @IsUUID()
  constrains: Array<any>;

  @IsString()
  output_timezone: string;

  @IsString()
  project_id: string;

  @IsString()
  resources: Array<string>;
    
  public static from(dto: Partial<AvailabilityDTO>) {
    const rd = new AvailabilityDTO();
    rd.constrains = dto.constrains;
    rd.output_timezone = dto.output_timezone;
    rd.project_id = dto.project_id;
    rd.resources = dto.resources;
    return rd;
  }

  public static fromEntity(entity: OutputSlot[]) {
    return entity.map(item => ({
      start: item.from,
      end: item.to,
      resources: [],
    }));
    // return this.from({
    //   id: entity.id,
    //   name: entity.name,
    //   email: entity.email,
    //   timezone: entity.timezone
    // });
  }

  // public static toEntity(dto: Partial<AvailabilityDTO>) {
  //   const r = new Resource();
  //   r.id = v4();
  //   r.email = dto.email;
  //   r.name = dto.name;
  //   r.timezone = dto.timezone;
  //   r.first_name = dto?.name?.split(' ')?.[0];
  //   r.last_name = dto?.name?.split(' ')?.[1];
  //   r.created_at = DateTime.utc().toJSDate();
  //   r.updated_at = DateTime.utc().toJSDate();
  //   r.createdBy = "";
  //   return r;
  // }
}
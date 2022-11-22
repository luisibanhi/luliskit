import { IsObject, IsString } from 'class-validator';
import { InputSlot, OutputSlot } from "slot-calculator"
import { Constraints } from '../model/resource.entity';
import { ConstraintsRequest } from '../resource/resource.dto';

export class AvailabilityDTO implements Readonly<AvailabilityDTO> {
  @IsObject()
  constraints: ConstraintsRequest[];

  constraints_formatted: Constraints;

  @IsString()
  output_timezone: string;

  @IsString()
  project_id: string;

  @IsString()
  resources: Array<string>;
    
  public static from(dto: Partial<AvailabilityDTO>) {
    const rd = new AvailabilityDTO();
    rd.constraints_formatted = this.formatConstrains(dto?.constraints);
    rd.output_timezone = dto.output_timezone;
    rd.project_id = dto.project_id;
    rd.resources = dto.resources;
    return rd;
  }

  public static fromEntity(entity: OutputSlot[], resource: object) {
    return entity.map(item => ({
      start: item.from,
      end: item.to,
      resources: [resource],
    }));
  }


  public static formatConstrains(constraints: ConstraintsRequest[]): Constraints {
    let constraint: Constraints = {
      blocks: [],
      allow: [],
    };

    constraints?.forEach(item => {
      if (item?.block_period) {
        constraint.blocks.push({
          from: item?.block_period?.start,
          to: item?.block_period?.end
        })
      }

      if (item?.allow_period) {
        constraint.allow.push({
          from: item?.allow_period?.start,
          to: item?.allow_period?.end
        })
      }

      if (item?.allow_day_and_time) {
        constraint.allow.push({
          // @ts-ignore
          day: item?.allow_day_and_time?.day,
          from: item?.allow_day_and_time?.start,
          to: item?.allow_day_and_time?.end
        })
      }
    })

    return constraint;
  }

  public static formatToConstrainsRequest(constraints: Constraints) {
    const constraint = [];

    if (constraints?.allow) {
      constraints.allow.forEach((item: InputSlot) => {
        // @ts-ignore
        if (item?.day) {
          return constraint.push({ allow_day_and_time: {
            // @ts-ignore
            day: item.day,
            start: item.from,
            end: item.to
           }});
        }
        constraint.push({ allow_period: {
          start: item.from,
          end: item.to
         }});
      });
    }

    if (constraints?.blocks) {
      constraints.blocks.forEach(item => {
        constraint.push({ block_period: {
          start: item.from,
          end: item.to
         }});
      });
    }

    return constraint;
  }
}
import { Body, Controller, Post } from '@nestjs/common';
import { DateTime } from 'luxon';
import { getSlots } from "slot-calculator"
import { BookingService } from '../booking/booking.service';
import { ProjectService } from '../project/project.service';
import { AvailabilityDTO } from './availability.dto';

@Controller('availability')
export class AvailabilityController {
  constructor(private readonly projSvc: ProjectService, private readonly bookingSvc: BookingService) {}
  @Post()
  public async getAvailability(@Body() dto: AvailabilityDTO) {
    const body = AvailabilityDTO.from(dto);
    let projectWithResource = await this.projSvc.findProjectWithResource(body.project_id, body.resources[0]);
    
    const bookingBlocked = await this.bookingSvc.getAllByResourceId(body.resources[0], new Date());

    projectWithResource = projectWithResource[0];
    
    const startAt = DateTime.utc().set({ minute: 0, second: 0, millisecond: 0 }).toString();
    const endAt = DateTime.utc().plus({ days: projectWithResource?.minSlotDays }).toString();

    const resource = {
      id: projectWithResource?.id,
      name: projectWithResource?.name,
      timezone: projectWithResource?.timezone
    };

    const workdays = projectWithResource?.availability_constraints?.allow.findIndex((item => item?.day)) != -1 ? projectWithResource?.availability_constraints?.allow : projectWithResource?.workdays_default

    const { availableSlots } = getSlots({
      from: startAt,
      to: endAt,
      duration: projectWithResource?.duration,
      outputTimezone: dto.output_timezone,
      availability: [...workdays, ...body?.constraints_formatted?.allow, ...projectWithResource?.availability_constraints?.allow] || [],
      unavailability: [ ...bookingBlocked, ...body?.constraints_formatted?.blocks, ...projectWithResource?.availability_constraints?.blocks] || [],
    });

    return AvailabilityDTO.fromEntity(availableSlots, resource);
  }
}

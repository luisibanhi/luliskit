import { Body, Controller, Post } from '@nestjs/common';
import { DateTime } from 'luxon';
import { getSlots } from "slot-calculator"
import { ProjectService } from '../project/project.service';
import { AvailabilityDTO } from './availability.dto';

@Controller('availability')
export class AvailabilityController {
  constructor(private readonly projectRepo: ProjectService) {}
  @Post()
  public async getAvailability(@Body() dto: AvailabilityDTO) {
    // resource
    // bookings
    // project
    const project = await this.projectRepo.findBy(dto.project_id);
    
    const startAt = DateTime.utc().set({ minute: 0, second: 0, millisecond: 0 }).toString();
    const endAt = DateTime.utc().plus({ days: 90 }).toString();

    const { availableSlots } = getSlots({
      from: startAt,
      to: endAt,
      duration: project?.duration,
      outputTimezone: dto.output_timezone,
      availability: project?.workdays_default || []
    })

    return AvailabilityDTO.fromEntity(availableSlots);
  }
}

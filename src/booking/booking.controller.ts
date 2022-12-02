import { BadRequestException, Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { Action, BookingDTO } from './booking.dto';
import { BookingService } from './booking.service';

@Controller('booking')
export class BookingController {
  constructor(private serv: BookingService) {}
  @Post()
  public async create(@Body() dto: BookingDTO): Promise<BookingDTO> {
    return await this.serv.create(dto);
  }

  @Get()
  public async getAll(): Promise<BookingDTO[]> {
    return await this.serv.getAll();
  }

  @Put(':id/:state')
  public async cancelBookingStatus(@Param('id') id: string, @Param('state') state: Action): Promise<BookingDTO[]> {
    const status = BookingDTO.convertActionToBookingStatus(state);
    if (!status) throw new BadRequestException(`Wrong action, should be ${Action.Cancel} or ${Action.CancelByCustomer}`)

    return await this.serv.updateStatus(id, status);
  }
}


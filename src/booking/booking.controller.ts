import { Body, Controller, Get, Post } from '@nestjs/common';
import { BookingDTO } from './booking.dto';
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
}


import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { InputSlot } from 'slot-calculator';
import { MoreThanOrEqual, Repository } from 'typeorm';
import { Booking } from '../model/booking.entity';
import { BookingDTO, Event } from './booking.dto';

@Injectable()
export class BookingService {
  constructor(@InjectRepository(Booking) private readonly repo: Repository<Booking>) {}

  public async getAll(): Promise<BookingDTO[]> {
    return await this.repo.find({
      relations: {
        resource: true,
      },
    }).then(resource => resource.map(e => BookingDTO.fromEntity(e)));
  }

  public async getAllByResourceId(id: string, date: Date): Promise<InputSlot[]> {
    return await this.repo.findBy({ resource: { id }, start: MoreThanOrEqual(date) }).then(booking => booking.map(e => BookingDTO.toFilterAvailability(e)));
  }

  public async findBy(id: string): Promise<BookingDTO> {
    return await this.repo.findOneBy({ id }).then(resource => BookingDTO.fromEntity(resource));
  }


  public async create(dto: BookingDTO): Promise<BookingDTO> {
    return this.repo.save(BookingDTO.toEntity(dto))
      .then(e => {
        return BookingDTO.fromEntity(e);
      });
  }
}

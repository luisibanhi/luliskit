import { BadRequestException, Injectable } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { InjectRepository } from '@nestjs/typeorm';
import { InputSlot } from 'slot-calculator';
import { LessThanOrEqual, MoreThanOrEqual, Repository } from 'typeorm';
import { Booking, BookingStatus } from '../model/booking.entity';
import { BookingDTO } from './booking.dto';

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

  public async updateStatus(id: string, state: BookingStatus): Promise<any> {
    const booking = await this.repo.findOneBy({ id });
    if (booking.state === BookingStatus.CONFIRMED) {
      return await this.repo.update(id, { state });
    }

    throw new BadRequestException(`Booking with wrong status to change: ${booking.state} should be ${BookingStatus.CONFIRMED}`);
  }

  @Cron('* 30 * * * *')
  public async updateStatusAfterPassed() {
    const bookings = await this.repo.findBy({ state: BookingStatus.CONFIRMED, end: LessThanOrEqual(new Date()) })

    if (bookings.length) {
      bookings.forEach(async (booking) => {
        await this.updateStatus(booking.id, BookingStatus.COMPLETED)
      })
    }
  }
}

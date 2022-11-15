import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Booking } from '../model/booking.entity';
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

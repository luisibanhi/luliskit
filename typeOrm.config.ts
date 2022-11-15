import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { CreateInitialMigration1667856349642 } from './src/migrations/1667856349642-CreateInitialMigration';
import { GenerateBookingTable1668519868772 } from './src/migrations/1668519868772-GenerateBookingTable';
import { UniqueConstrainBookingTable1668521065613 } from './src/migrations/1668521065613-UniqueConstrainBookingTable';
import AvailabilityConstrainsEntity from './src/model/availability_constraints.entity'
import ProjectEntity from './src/model/project.entity'
import ResourceEntity from './src/model/resource.entity';
import BookingEntity from './src/model/booking.entity';
 
config();
 
const configService = new ConfigService();
 
export default new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DATABASE'),
  entities: [AvailabilityConstrainsEntity, ResourceEntity, ProjectEntity, BookingEntity],
  migrations: [CreateInitialMigration1667856349642, GenerateBookingTable1668519868772, UniqueConstrainBookingTable1668521065613],
  ssl: true,
});
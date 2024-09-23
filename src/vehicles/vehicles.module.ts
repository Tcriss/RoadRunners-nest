import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VehicleService } from './application/services/vehicle.service';
import { VehicleController } from './infrastructure/controllers/vehicle.controller';
import { Vehicle, Seller, Image } from './domain/entities';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  providers: [VehicleService],
  controllers: [VehicleController],
  imports: [
    TypeOrmModule.forFeature([Vehicle, Seller, Image]), 
    CloudinaryModule
  ]
})
export class VehiclesModule {}
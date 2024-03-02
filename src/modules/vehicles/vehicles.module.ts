import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { VehicleService } from './services/vehicle.service';
import { VehicleController } from './controllers/vehicle.controller';
import { Vehicle, Seller } from './entities';
import { CloudinaryModule } from '../cloudinary/cloudinary.module';

@Module({
  providers: [VehicleService],
  controllers: [VehicleController],
  imports: [
    TypeOrmModule.forFeature([Vehicle, Seller]), 
    CloudinaryModule
  ]
})
export class VehiclesModule {}
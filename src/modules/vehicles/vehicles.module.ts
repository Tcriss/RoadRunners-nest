import { Module } from '@nestjs/common';
import { VehicleService } from './services/vehicle.service';
import { VehicleController } from './controllers/vehicle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle, Image, Seller } from './entities';

@Module({
  providers: [VehicleService],
  controllers: [VehicleController],
  imports: [TypeOrmModule.forFeature([Vehicle, Image, Seller])]
})
export class VehiclesModule {}

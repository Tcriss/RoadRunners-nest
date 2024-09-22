import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CacheModule } from '@nestjs/cache-manager';

import { VehicleService } from './vehicle.service';
import { Image, Seller, Vehicle } from '../../domain/entities';
import { CloudinaryModule } from '../../../cloudinary/cloudinary.module';

describe('VehicleService', () => {
  let service: VehicleService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VehicleService],
      imports: [
        ConfigModule,
        TypeOrmModule.forFeature([Vehicle, Seller, Image]),
        CloudinaryModule,
        CacheModule.register({})
      ]

    }).compile();

    service = module.get<VehicleService>(VehicleService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

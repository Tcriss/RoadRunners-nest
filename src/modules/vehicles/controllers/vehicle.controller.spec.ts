import { Test, TestingModule } from '@nestjs/testing';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { VehicleService } from '../services/vehicle.service';
import { VehicleController } from './vehicle.controller';

describe('VehicleController', () => {
  let controller: VehicleController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [VehicleController],
      providers: [VehicleService],
      imports: [ConfigModule]
    }).compile();

    controller = module.get<VehicleController>(VehicleController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

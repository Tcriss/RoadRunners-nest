import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Cache, CACHE_MANAGER } from '@nestjs/cache-manager';
import { HttpException, HttpStatus } from '@nestjs/common';
import { Repository } from 'typeorm';

import { VehicleService } from './vehicle.service';
import { Vehicle } from '../../domain/entities';
import { vehicleRepositoryMock } from '../../domain/mocks';
import { CloudinaryService } from '../../../cloudinary/application/services/cloudinary.service';
import { cloudinaryServiceMock } from '../../../cloudinary/domain/mocks';
import { vehicleMocks } from '../../domain/mocks/vehicles.mock';
import { cacheMock } from '../../../common/domain/mocks';

describe('VehicleService', () => {
  let service: VehicleService;
  let repository: Repository<Vehicle>;
  let cloudinaryService: CloudinaryService;
  let cache: Cache;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        VehicleService,
        {
          provide: getRepositoryToken(Vehicle),
          useValue: vehicleRepositoryMock
        },
        {
          provide: CloudinaryService,
          useValue: cloudinaryServiceMock
        },
        {
          provide: CACHE_MANAGER,
          useValue: cacheMock
        }
      ]}).compile();

    service = module.get<VehicleService>(VehicleService);
    repository = module.get<Repository<Vehicle>>(getRepositoryToken(Vehicle));
    cloudinaryService = module.get<CloudinaryService>(CloudinaryService);
    cache = module.get<Cache>(CACHE_MANAGER);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('Find All', () => {
    it('should find all vehicles', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue(vehicleMocks);
      jest.spyOn(cache, 'get').mockResolvedValue(null);

      const res = await service.findAllVehicles();

      expect(res).toEqual(vehicleMocks);
    });

    it('should find with query params', async () => {
      jest.spyOn(repository, 'find').mockResolvedValue([ vehicleMocks[1] ]);
      jest.spyOn(cache, 'get').mockResolvedValue(null);

      const res = await service.findAllVehicles({
        type: 'Sedán'
      });

      expect(res).toStrictEqual([ vehicleMocks[1] ]);
      expect(res[0].type).toBe('Sedán');
    });
  });

  describe('Find One', () => {
    it('should find one vehicle', async () => {
      jest.spyOn(cache, 'get').mockResolvedValue(null);
      jest.spyOn(repository, 'findOne').mockResolvedValue(vehicleMocks[0]);

      const res = await service.findOneVehicle(vehicleMocks[0]._id);

      expect(res).toBe(vehicleMocks[0]);
    });

    it('should return cached data', async () => {
      jest.spyOn(cache, 'get').mockResolvedValue(vehicleMocks[2]);
      jest.spyOn(repository, 'findOne').mockResolvedValue(vehicleMocks[0]);

      const res = await service.findOneVehicle(vehicleMocks[2]._id);

      expect(res).toBe(vehicleMocks[2]);
    });

    it('should not return cache if id does not match', async () => {
      jest.spyOn(cache, 'get').mockResolvedValue(vehicleMocks[2]);
      jest.spyOn(repository, 'findOne').mockResolvedValue(vehicleMocks[0]);

      const res = await service.findOneVehicle(vehicleMocks[0]._id);

      expect(res).toBe(vehicleMocks[0]);
    });

    it('should throw an exception if vehicle was not found', async () => {
      jest.spyOn(cache, 'get').mockResolvedValue(null);
      jest.spyOn(repository, 'findOne').mockResolvedValue(undefined);

      try {
        await service.findOneVehicle(vehicleMocks[0]._id);
      } catch(err) {
        expect(err).toBeInstanceOf(HttpException);
        expect(err.status).toBe(HttpStatus.NOT_FOUND);
        expect(err.message).toBe('Vehicle not found');
      }
    });
  });

  describe('Create', () => {
    it('should create a vehicle', async () => {
      jest.spyOn(cloudinaryService, 'uploadFiles').mockResolvedValue([
        { id: '001', url: 'image-url-1' },
        { id: '002', url: 'image-url-2' }
      ]);
      jest.spyOn(repository, 'create').mockResolvedValue(vehicleMocks[3] as never);
      jest.spyOn(repository, 'save').mockResolvedValue(vehicleMocks[3]);

      const res = await service.createVehicle({
        brand: vehicleMocks[3].brand,
        condition: vehicleMocks[3].condition,
        email: '',
        fuel: vehicleMocks[3].fuel,
        location: vehicleMocks[3].location,
        model: vehicleMocks[3].model,
        images: [],
        name: '',
        owner: vehicleMocks[3].owner,
        phone: '',
        picture: '',
        price: vehicleMocks[3].price,
        seller: vehicleMocks[3].seller,
        type: vehicleMocks[3].type,
        year: vehicleMocks[3].year
      }, []);

      expect(res).toBe('Vehicle saved succesfully');
    });

    it('should throw an exception if vehicle was not created', async () => {
      jest.spyOn(cloudinaryService, 'uploadFiles').mockResolvedValue([
        { id: '001', url: 'image-url-1' },
        { id: '002', url: 'image-url-2' }
      ]);

      try {
        await service.createVehicle({
          brand: vehicleMocks[3].brand,
          condition: vehicleMocks[3].condition,
          email: '',
          fuel: vehicleMocks[3].fuel,
          location: vehicleMocks[3].location,
          model: vehicleMocks[3].model,
          images: [],
          name: '',
          owner: vehicleMocks[3].owner,
          phone: '',
          picture: '',
          price: vehicleMocks[3].price,
          seller: vehicleMocks[3].seller,
          type: vehicleMocks[3].type,
          year: vehicleMocks[3].year
        }, []);
      } catch(err) {
        expect(err).toBeInstanceOf(HttpException);
        expect(err.status).toBe(HttpStatus.NOT_FOUND);
        expect(err.message).toBe("Couldn't save this vehicle");
      }
    });
  });

  describe('Update', () => {
    it('should update a vehicle', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(vehicleMocks[0]);
      jest.spyOn(repository, 'update').mockImplementation(() => Promise.resolve({ raw: '',affected: 1, generatedMaps: [] }));

      const res = await service.editVehicle(vehicleMocks[0]._id,{
        brand: vehicleMocks[3].brand,
        condition: vehicleMocks[3].condition,
        email: '',
        fuel: vehicleMocks[3].fuel,
        location: vehicleMocks[3].location,
        model: vehicleMocks[3].model,
        name: '',
        owner: vehicleMocks[3].owner,
        phone: '',
        picture: '',
        price: vehicleMocks[3].price,
        seller: vehicleMocks[3].seller,
        type: vehicleMocks[3].type,
        year: vehicleMocks[3].year
      }, vehicleMocks[0].owner);

      expect(res).toBe('Changes saved succesfully');
    });

    it('shpuld not update if not the owner', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(vehicleMocks[3]);
      jest.spyOn(repository, 'update').mockImplementation(() => Promise.resolve({ raw: '',affected: 1, generatedMaps: [] }));
      
      try {
        await service.editVehicle(vehicleMocks[0]._id,{
          brand: vehicleMocks[3].brand,
          condition: vehicleMocks[3].condition,
          email: '',
          fuel: vehicleMocks[3].fuel,
          location: vehicleMocks[3].location,
          model: vehicleMocks[3].model,
          name: '',
          owner: vehicleMocks[3].owner,
          phone: '',
          picture: '',
          price: vehicleMocks[3].price,
          seller: vehicleMocks[3].seller,
          type: vehicleMocks[3].type,
          year: vehicleMocks[3].year
        }, vehicleMocks[2].owner);
      } catch(err) {
        expect(err).toBeInstanceOf(HttpException);
        expect(err.status).toBe(HttpStatus.FORBIDDEN);
        expect(err.message).toBe('You do not have permissions')
      };
    });
  });

  describe('Delete', () => {
    it('should delete a vehicle', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(vehicleMocks[0]);
      jest.spyOn(repository, 'delete').mockResolvedValue({
        raw: '',
        affected: 1
      });

      const res = await service.deleteVehicle(vehicleMocks[0]._id, vehicleMocks[0].owner);

      expect(res).toBe('Vehicle deleted');
    });

    it('should not delete if you are not the owner', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(vehicleMocks[1]);

      try {
        await service.deleteVehicle(vehicleMocks[1]._id, vehicleMocks[0].owner);
      } catch (err) {
        expect(err).toBeInstanceOf(HttpException);
        expect(err.status).toBe(HttpStatus.FORBIDDEN);
        expect(err.message).toBe('You do not have permissions');
      }
    });

    it('should throw an exception if vehicle could not be deleted', async () => {
      jest.spyOn(repository, 'findOne').mockResolvedValue(vehicleMocks[1]);
      jest.spyOn(repository, 'delete').mockResolvedValue({
        raw: '',
        affected: 0
      });

      try {
        await service.deleteVehicle(vehicleMocks[1]._id, vehicleMocks[1].owner);
      } catch (err) {
        expect(err).toBeInstanceOf(HttpException);
        expect(err.status).toBe(HttpStatus.INTERNAL_SERVER_ERROR);
        expect(err.message).toBe('Oops!, something went wrong');
      }
    });
  });
});
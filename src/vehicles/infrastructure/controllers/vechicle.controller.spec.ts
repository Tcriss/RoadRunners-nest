import { Test, TestingModule } from "@nestjs/testing";

import { VehicleService } from "../../application/services/vehicle.service";
import { VehicleController } from "./vehicle.controller";
import { vehicleMocks, vehicleServiceMock } from "../../domain/mocks";

describe('Vehicle Controller', () => {
    let controller: VehicleController;
    let service: VehicleService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                {
                    provide: VehicleService,
                    useValue: vehicleServiceMock
                }
            ],
            controllers: [
                VehicleController
            ]
        }).compile();

        controller = module.get<VehicleController>(VehicleController);
        service = module.get<VehicleService>(VehicleService);
    });

    it('should be define', () => {
        expect(controller).toBeDefined();
    });

    describe('Find All', () => {
        it('should fetch all vehicles', async () => {
            jest.spyOn(service, 'findAllVehicles').mockImplementation(() => Promise.resolve(vehicleMocks));

            const res = await controller.findAll();

            expect(res).toBe(vehicleMocks);
        });

        it('should fetch all vehicles by query params', async () => {
            jest.spyOn(service, 'findAllVehicles').mockImplementation(() => Promise.resolve([ vehicleMocks[0] ]));

            const res = await controller.findAll({ type: 'Jeepeta' });

            expect(res).toStrictEqual([ vehicleMocks[0] ]);
            expect(res[0].type).toBe('Jeepeta');
        });
    });

    describe('Find One', () => {
        it('should find one vehicle', async () => {
            jest.spyOn(service, 'findOneVehicle').mockResolvedValue(vehicleMocks[0]);
        
            const res = await controller.findOne(vehicleMocks[0]._id);
        
            expect(res).toBe(vehicleMocks[0]);
        });
    });

    describe('Create', () => {
        it('should create a vehicle', async () => {
            jest.spyOn(service, 'createVehicle').mockImplementation(() => Promise.resolve('Vehicle saved succesfully'));
      
            const res = await controller.create({
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
    });

    describe('Update', () => {
        it('should update a vehicle', async () => {
            jest.spyOn(service, 'editVehicle').mockImplementation(() => Promise.resolve('Changes saved succesfully'));
      
            const res = await controller.edit(
                vehicleMocks[0]._id,
                {
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
                },
                {
                    user: vehicleMocks[3].owner
                }
            );
      
            expect(res).toBe('Changes saved succesfully');
          });
    });

    describe('Delete', () => {
        it('should delete a vehicle', async () => {
            jest.spyOn(service, 'deleteVehicle').mockResolvedValue('Vehicle deleted');
      
            const res = await service.deleteVehicle(vehicleMocks[0]._id, vehicleMocks[0].owner);
      
            expect(res).toBe('Vehicle deleted');
        });
    });
});
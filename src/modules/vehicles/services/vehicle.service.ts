import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, ObjectId, Repository, UpdateResult } from 'typeorm';
import { Vehicle } from '../entities';
import { CreateVehicleDto, DetailsVehicleDto, EditVehicleDto, ListVehiclesDto } from '../dto';

@Injectable()
export class VehicleService {

    constructor(@InjectRepository(Vehicle) private vehicleRepositoy: Repository<Vehicle>) {}

    public async findAllVehicles(): Promise<ListVehiclesDto[]> {
        return await this.vehicleRepositoy.find();
    }

    public async findOneVehicle(id: ObjectId): Promise<DetailsVehicleDto> {
        const vehicle: DetailsVehicleDto = await this.vehicleRepositoy.findOneBy({_id: id});

        if (!vehicle) throw new HttpException('Vehicle not found', HttpStatus.NOT_FOUND);

        return vehicle;
    }

    public async createVehicle(vehicle: CreateVehicleDto): Promise<string> {
        const data: Vehicle = this.vehicleRepositoy.create(vehicle);

        if (!data) throw new HttpException("Couldn't save this vehicle", HttpStatus.NOT_FOUND);

        await this.vehicleRepositoy.save(data);

        return 'Vehicle saved succesfully';
    }

    public async editVehicle(id: ObjectId, vehicle: EditVehicleDto): Promise<string> {
        const res: UpdateResult = await this.vehicleRepositoy.update(id, vehicle);

        if (res.affected === 0) throw new HttpException('Vehicle not found', HttpStatus.NOT_FOUND);

        return 'Changes saved succesfully';
    }

    public async deleteVehcile(id: ObjectId): Promise<void> {
        const res: DeleteResult = await this.vehicleRepositoy.delete(id);

        if (res.affected === 0) throw new HttpException('Oops!, something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        if (res.affected === 1) throw new HttpException('User deleted', HttpStatus.OK);
    }
}

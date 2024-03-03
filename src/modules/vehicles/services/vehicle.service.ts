import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ObjectId } from 'mongodb';

import { Vehicle, Image } from '../entities';
import { CreateVehicleDto, EditVehicleDto } from '../dto';
import { CloudinaryService } from 'src/modules/cloudinary/services/cloudinary.service';
import { listVehicleData, getVehicleData } from '../utils/';

@Injectable()
export class VehicleService {

    constructor(
        @InjectRepository(Vehicle) 
        private readonly vehicleRepositoy: Repository<Vehicle>,
        private readonly cloudinaryService: CloudinaryService,
    ) {}

    public async findAllVehicles(): Promise<Vehicle[]> {
        return await this.vehicleRepositoy.find({
            select: listVehicleData
        });
    }

    public async findOneVehicle(id: ObjectId): Promise<Vehicle> {
        const vehicle: Vehicle = await this.vehicleRepositoy.findOne({where: {_id: new ObjectId(id)}, select: getVehicleData});

        if (!vehicle) throw new HttpException('Vehicle not found', HttpStatus.NOT_FOUND);

        return vehicle;
    }

    public async createVehicle(vehicle: CreateVehicleDto, images: Express.Multer.File[]): Promise<string | any> {
        const imagesData: Image[] = await this.cloudinaryService.uploadFiles(images);

        vehicle['portrait'] = imagesData[0];
        vehicle.images = imagesData;

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
        const res: DeleteResult = await this.vehicleRepositoy.delete(new ObjectId(id));

        if (res.affected === 0) throw new HttpException('Oops!, something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        if (res.affected === 1) throw new HttpException('User deleted', HttpStatus.OK);
    }
}

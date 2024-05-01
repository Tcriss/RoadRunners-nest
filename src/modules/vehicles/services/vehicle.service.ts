import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult, Repository, UpdateResult } from 'typeorm';
import { ObjectId } from 'mongodb';

import { Vehicle, Image, Seller } from '../entities';
import { CreateVehicleDto, EditVehicleDto } from '../dto';
import { CloudinaryService } from '../../cloudinary/services/cloudinary.service';
import { listVehicleData, getVehicleData } from '../utils/';

@Injectable()
export class VehicleService {

    constructor(
        @InjectRepository(Vehicle) 
        private readonly vehicleRepositoy: Repository<Vehicle>,
        private readonly cloudinaryService: CloudinaryService,
    ) {}

    public async findAllVehicles(filters: unknown): Promise<Vehicle[]> {
        return await this.vehicleRepositoy.find({
            select: listVehicleData,
            where: filters
        });
    }

    public async findOneVehicle(id: ObjectId): Promise<Vehicle> {
        const vehicle: Vehicle = await this.vehicleRepositoy.findOne({where: {_id: new ObjectId(id)}, select: getVehicleData});

        if (!vehicle) throw new HttpException('Vehicle not found', HttpStatus.NOT_FOUND);

        return vehicle;
    }

    public async createVehicle(vehicle: CreateVehicleDto, images: Express.Multer.File[]): Promise<string | any> {
        const imagesData: Image[] = await this.cloudinaryService.uploadFiles(images);
        const seller: Seller = {
            _id: new ObjectId(),
            picture: vehicle.picture,
            name: vehicle.name,
            email: vehicle.email,
            phone: vehicle.phone,
            whatsapp: vehicle.whatsapp,
            telegram: vehicle.telegram
        };
        vehicle['portrait'] = imagesData[0];
        vehicle.images = imagesData;
        vehicle.seller = seller;

        const data: Vehicle = this.vehicleRepositoy.create(vehicle);
        
        if (!data) throw new HttpException("Couldn't save this vehicle", HttpStatus.NOT_FOUND);

        await this.vehicleRepositoy.save(data);

        return 'Vehicle saved succesfully';
    }

    public async editVehicle(id: ObjectId, vehicle: EditVehicleDto, uid: string): Promise<string> {
        const car: Vehicle = await this.findOneVehicle(id);

        if (car.owner !== uid) throw new HttpException("You don't have permissions to do this action", HttpStatus.UNAUTHORIZED);

        const res: UpdateResult = await this.vehicleRepositoy.update(new ObjectId(id), vehicle);

        if (res.affected === 0) throw new HttpException('Vehicle not found', HttpStatus.NOT_FOUND);

        return 'Changes saved succesfully';
    }

    public async deleteVehcile(id: ObjectId, uid: string): Promise<void> {
        const vehicle: Vehicle = await this.findOneVehicle(id);

        if (vehicle.owner !== uid) throw new HttpException("You don't have permissions to do this action", HttpStatus.UNAUTHORIZED);

        const res: DeleteResult = await this.vehicleRepositoy.delete(new ObjectId(id));

        if (res.affected === 0) throw new HttpException('Oops!, something went wrong', HttpStatus.INTERNAL_SERVER_ERROR);
        if (res.affected === 1) {
            vehicle.images.map(image => this.cloudinaryService.deleteFile(image.id));

            throw new HttpException('User deleted', HttpStatus.OK);
        };
    }
}

import { Body, Controller, Delete, Get, Param, Post, Put, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { ObjectId } from 'mongodb';

import { Vehicle } from '../entities';
import { CreateVehicleDto, EditVehicleDto } from '../dto';
import { PublicAccess } from 'src/common/decorators/public-access.decorator';
import { VehicleService } from '../services/vehicle.service';
import { FilesInterceptor } from '@nestjs/platform-express';
import { imageValidations } from '../config/image-validations.config';

@Controller('vehicles')
export class VehicleController {

    constructor(private vehicleService: VehicleService) {}

    @PublicAccess()
    @Get()
    findAll(): Promise<Vehicle[]> {
        return this.vehicleService.findAllVehicles();
    }

    @PublicAccess()
    @Get(':id')
    findOne(@Param('id') id: ObjectId): Promise<Vehicle> {
        return this.vehicleService.findOneVehicle(id);
    }
    
    @PublicAccess()
    @Post('create')
    @UseInterceptors(FilesInterceptor('images', 7))
    create(@Body() vehicle: CreateVehicleDto, @UploadedFiles(imageValidations) images: Express.Multer.File[]): Promise<string | any> {
        return this.vehicleService.createVehicle(vehicle, images);
    }

    @Put('edit/:id')
    edit(@Param('id') id: ObjectId, @Body() vehicle: EditVehicleDto): Promise<string> {
        return this.vehicleService.editVehicle(id, vehicle);
    }

    @Delete('delete/:id')
    delete(@Param('id') id: ObjectId): Promise<void> {
        return this.vehicleService.deleteVehcile(id);
    }
}

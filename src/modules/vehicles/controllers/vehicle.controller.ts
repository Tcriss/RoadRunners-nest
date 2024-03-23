import { Body, Controller, Delete, Get, Param, Post, Put, Req, UploadedFiles, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongodb';

import { Vehicle } from '../entities';
import { CreateVehicleDto, EditVehicleDto } from '../dto';
import { VehicleService } from '../services/vehicle.service';
import { imageValidations } from '../config/image-validations.config';
import { PublicAccess } from '../../../common/decorators/public-access.decorator';

@Controller('vehicles')
export class VehicleController {

    constructor(private vehicleService: VehicleService) {}

    @PublicAccess()
    @Get()
    findAll(@Req() req: unknown): Promise<Vehicle[]> {
        console.log('user: ', req['user'])
        return this.vehicleService.findAllVehicles();
    }

    @PublicAccess()
    @Get(':id')
    findOne(@Param('id') id: ObjectId): Promise<Vehicle> {
        return this.vehicleService.findOneVehicle(id);
    }
    
    @Post('create')
    @UseInterceptors(FilesInterceptor('images', 7))
    create(@Body() vehicle: CreateVehicleDto, @UploadedFiles(imageValidations) images: Express.Multer.File[]){
        return this.vehicleService.createVehicle(vehicle, images);
    }

    @Put('edit/:id')
    edit(@Param('id') id: ObjectId, @Body() vehicle: EditVehicleDto, @Req() req: unknown): Promise<string> {
        return this.vehicleService.editVehicle(id, vehicle, req['user']);
    }

    @Delete('delete/:id')
    delete(@Param('id') id: ObjectId, @Req() req: unknown): Promise<void> {
        return this.vehicleService.deleteVehcile(id, req['user']);
    }
}

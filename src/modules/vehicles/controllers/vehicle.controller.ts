import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UploadedFiles, UseGuards, UseInterceptors } from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { ObjectId } from 'mongodb';

import { Vehicle } from '../entities';
import { CreateVehicleDto, EditVehicleDto } from '../dto';
import { VehicleService } from '../services/vehicle.service';
import { imageValidations } from '../config/image-validations.config';
import { JwtGuard } from '../../../modules/auth/guards/jwt.guard';

@Controller('vehicles')
export class VehicleController {

    constructor(private vehicleService: VehicleService) {}

    @Get()
    findAll(@Query() filters: unknown): Promise<Vehicle[]> {
        return this.vehicleService.findAllVehicles(filters);
    }

    @Get(':id')
    findOne(@Param('id') id: ObjectId): Promise<Vehicle> {
        return this.vehicleService.findOneVehicle(id);
    }
    
    @UseGuards(JwtGuard)
    @Post('create')
    @UseInterceptors(FilesInterceptor('images', 7))
    create(@Body() vehicle: CreateVehicleDto, @UploadedFiles(imageValidations) images: Express.Multer.File[]){
        return this.vehicleService.createVehicle(vehicle, images);
    }

    @UseGuards(JwtGuard)
    @Put('edit/:id')
    edit(@Param('id') id: ObjectId, @Body() vehicle: EditVehicleDto, @Req() req: { user: string }): Promise<string> {
        return this.vehicleService.editVehicle(id, vehicle, req.user);
    }

    @UseGuards(JwtGuard)
    @Delete('delete/:id')
    delete(@Param('id') id: ObjectId, @Req() req: { user: string }): Promise<void> {
        return this.vehicleService.deleteVehcile(id, req.user);
    }
}

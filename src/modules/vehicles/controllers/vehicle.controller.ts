import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { CreateVehicleDto, DetailsVehicleDto, EditVehicleDto, ListVehiclesDto } from '../dto';
import { VehicleService } from '../services/vehicle.service';
import { ObjectId } from 'typeorm';

@Controller('vehicles')
export class VehicleController {

    constructor(private vehicleService: VehicleService) {}

    @Get()
    findAll(): Promise<ListVehiclesDto[]> {
        return this.vehicleService.findAllVehicles();
    }

    @Get(':id')
    findOne(@Param('id') id: ObjectId): Promise<DetailsVehicleDto> {
        return this.vehicleService.findOneVehicle(id);
    }

    @Post('create')
    create(@Body() vehicle :CreateVehicleDto): Promise<string> {
        return this.vehicleService.createVehicle(vehicle);
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

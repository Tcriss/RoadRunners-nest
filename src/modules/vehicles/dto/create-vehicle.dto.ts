import { IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

import { Image, Seller } from "../entities";

export class CreateVehicleDto {
    @IsNotEmpty()
    @IsString()
    location: string;
    
    @IsNotEmpty()
    @IsString()
    brand: string;
    
    @IsNotEmpty()
    @IsString()
    type: string;
    
    @IsNotEmpty()
    @IsString()
    model: string;
    
    @IsNotEmpty()
    @IsString()
    condition: string;
    
    @IsNotEmpty()
    @IsString()
    fuel: string;
    
    @IsNotEmpty()
    @IsString()
    year: string;
    
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @IsNotEmpty()
    @ValidateNested()
    seller: Seller;

    @IsNotEmpty()
    @ValidateNested()
    images: Image[];
}
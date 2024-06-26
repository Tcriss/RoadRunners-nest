import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

import { Image, Seller } from "../entities";

export class CreateVehicleDto {
    @IsNotEmpty()
    @IsString()
    owner: string;

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

    @IsOptional()
    @ValidateNested()
    seller: Seller;

    @IsNotEmpty()
    @IsString()
    picture: string;

    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    phone: string;

    @IsOptional()
    @IsString()
    whatsapp: string;

    @IsOptional()
    @IsString()
    telegram: string;

    @IsOptional()
    @ValidateNested()
    images: Image[];
}
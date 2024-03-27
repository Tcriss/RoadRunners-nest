import { IsEmail, IsNumber, IsOptional, IsString, ValidateNested } from "class-validator";

import { Seller } from "../entities";

export class EditVehicleDto {
    @IsOptional()
    @IsString()
    location: string;
    
    @IsOptional()
    @IsString()
    brand: string;
    
    @IsOptional()
    @IsString()
    type: string;
    
    @IsOptional()
    @IsString()
    model: string;
    
    @IsOptional()
    @IsString()
    condition: string;
    
    @IsOptional()
    @IsString()
    fuel: string;
    
    @IsOptional()
    @IsString()
    year: string;
    
    @IsOptional()
    @IsNumber()
    price: number;

    @IsOptional()
    @ValidateNested()
    seller: Seller;

    @IsOptional()
    @IsString()
    picture: string;

    @IsOptional()
    @IsString()
    name: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    phone: string;

    @IsOptional()
    @IsString()
    whatsapp: string;

    @IsOptional()
    @IsString()
    telegram: string;
}
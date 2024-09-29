import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, ValidateNested } from "class-validator";

import { Image, Seller } from "../entities";
import { Condition, Fuel, Type } from "../enums";

export class CreateVehicleDto {
    @IsNotEmpty()
    @IsString()
    owner: string;

    @IsNotEmpty()
    @IsString()
    @Matches('^[A-Za-zñÑ ]+$', '', { message: 'location must be your city name' })
    location: string;
    
    @IsNotEmpty()
    @IsString()
    @Matches('^[A-Za-zñÑ ]+$', '', { message: 'brand cannot have numbers' })
    brand: string;
    
    @IsNotEmpty()
    @IsString()
    @IsEnum(Type)
    type: string;
    
    @IsNotEmpty()
    @IsString()
    @Matches('^[A-Za-zñÑ0-9 ]+$', '', { message: 'model only has letters and numbers' })
    model: string;
    
    @IsNotEmpty()
    @IsString()
    @IsEnum(Condition)
    condition: string;
    
    @IsNotEmpty()
    @IsString()
    @IsEnum(Fuel)
    fuel: string;
    
    @IsNotEmpty()
    @IsString()
    @Matches('^[0-9]{4}$', '', { message: 'type must be four numbers: 2024' })
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
    @Matches('^[A-Za-zñÑ ]+$', '', { message: 'name only has letters' })
    name: string;

    @IsNotEmpty()
    @IsEmail()
    email: string;

    @IsNotEmpty()
    @IsString()
    @Matches('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$')
    phone: string;

    @IsOptional()
    @IsString()
    @Matches('^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$')
    whatsapp?: string;

    @IsOptional()
    @IsString()
    telegram?: string;

    @IsOptional()
    @ValidateNested()
    images: Image[];
}
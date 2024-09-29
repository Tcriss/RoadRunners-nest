import { IsEmail, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString, Matches, ValidateNested } from "class-validator";

import { Seller } from "../entities";
import { Condition, Fuel } from "../enums";

export class EditVehicleDto {
    @IsNotEmpty()
    @IsString()
    owner: string;

    @IsOptional()
    @IsString()
    @Matches('^[A-Za-zñÑ ]+$')
    location: string;
    
    @IsOptional()
    @IsString()
    @Matches('^[A-Za-zñÑ ]+$')
    brand: string;
    
    @IsOptional()
    @IsString()
    @Matches('^[A-Za-zñÑ0-9 ]+$')
    type: string;
    
    @IsOptional()
    @IsString()
    @Matches('^[A-Za-zñÑ ]+$')
    model: string;
    
    @IsOptional()
    @IsString()
    @IsEnum(Condition)
    condition: string;
    
    @IsOptional()
    @IsString()
    @IsEnum(Fuel)
    fuel: string;
    
    @IsOptional()
    @IsString()
    @Matches('^[0-9]{4}+$')
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
    @Matches('^[A-Za-zñÑ ]+$')
    name: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
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
}
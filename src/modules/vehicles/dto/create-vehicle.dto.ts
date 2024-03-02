
import { IsNotEmpty, IsString, ValidateNested } from "class-validator";
import { Seller } from "../entities";

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
    @IsString()
    price: number;

    @IsNotEmpty()
    @ValidateNested()
    seller: Seller;
}
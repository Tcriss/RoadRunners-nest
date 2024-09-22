import { IsEmail, IsOptional, IsString } from "class-validator";

import { IUser } from "../interfaces/user.interface";

export class EditUser implements IUser {
    @IsOptional()
    @IsString()
    given_name: string;

    @IsOptional()
    @IsString()
    family_name: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    picture: string;
}
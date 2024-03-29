import { IsEmail, IsOptional, IsString } from "class-validator";

import { IUser } from "../interfaces/user.interface";

export class EditUser implements IUser {
    @IsOptional()
    @IsString()
    userId: string;

    @IsOptional()
    @IsString()
    givenName: string;

    @IsOptional()
    @IsString()
    familyName: string;

    @IsOptional()
    @IsEmail()
    email: string;

    @IsOptional()
    @IsString()
    picture: string;
}